import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { ServerStyleSheet, StyleSheetManager } from 'styled-components';
import express from 'express';
import { Provider } from 'react-redux';
import Helmet from 'react-helmet';
import { I18nextProvider } from 'react-i18next'; // as we build ourself via webpack
import i18nMiddleware from 'i18next-express-middleware';
import { matchRoutes } from 'react-router-config';
import 'babel-polyfill';

import i18n from './i18n.server'; // initialised i18next instances
import configureStore from './config/store';
import getServerHtml from './config/server-html';
import { getToken } from './helpers/server';
import Server from './routes/app/server';
import { routerConf } from './routes';
import CONFIG from './config';

// Load SCSS
import '../scss/app.scss';

const app = express();
const hostname = 'localhost';
const port = 8080;

app.use('/client', express.static('build/client'));
app.use(i18nMiddleware.handle(i18n));

app.use((req, res) => {
  // Creates empty store for each request
  const store = configureStore();
  // Perform pre-fetches
  const branch = matchRoutes(routerConf, req.url);
  let locale = req.language;
  let country; // We need this to ensure the request matches on language
  branch.map(({ match }) => {
    if (match && match.params && Object.keys(match.params).length > 0) {
      if (match.params.language && CONFIG.languages.indexOf(match.params.language) !== -1) {
        locale = match.params.language;
        country = match.params.language;
      }
    }
  });
  const promises = branch.map(({ route }) => {
    if (route.component && route.component.getInitialProps) {
      const getInitialProps = route.component.getInitialProps;
      const authToken = getToken(req);
      return getInitialProps instanceof Function && country ? getInitialProps(store, country, authToken) : Promise.resolve(null);
    }
    return Promise.resolve(null);
  });
  // Handle locales
  const i18nServer = i18n.cloneInstance();
  i18nServer.changeLanguage(locale);
  return Promise.all(promises).then(setTimeout(() => { // Timeout to account for async store update
    // Dehydrates the state
    const dehydratedState = JSON.stringify(store.getState());

    // Context is passed to the StaticRouter and it will attach data to it directly
    const context = {};
    const sheet = new ServerStyleSheet();
    const appHtml = ReactDOMServer.renderToString(
      <I18nextProvider i18n={ i18nServer }>
        <Provider store={ store }>
          <StyleSheetManager sheet={ sheet.instance }>
            <Server location={ req.url } context={ context } />
          </StyleSheetManager>
        </Provider>
      </I18nextProvider>
    );

    const helmet = Helmet.renderStatic();
    const serverHtml = getServerHtml(appHtml, dehydratedState, helmet, sheet);

    // Context has url, which means `<Redirect>` was rendered somewhere
    if (context.url) {
      res.redirect(301, context.url);
    } else {
    // We're good, send the response
      res.status(context.status || 200).send(serverHtml);
    }
  }, 500));

  // TODO how to handle 50x errors?
});

// Start listening
app.listen(port, (error) => {
  if (error) {
    console.error(error); // eslint-disable-line
  } else {
    console.info(`\n★★ Listening on port ${ port }. Open up http://${ hostname }:${ port }/ in your browser.\n`); // eslint-disable-line
  }
});