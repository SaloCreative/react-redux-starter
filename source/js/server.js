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
import { routesConfig } from './routes';
import CONFIG from './config';

// Load SCSS
import '../scss/app.scss';

const app = express();
const hostname = 'localhost';
const port = 8080;

app.use('/client', express.static('build/client'));
app.use(i18nMiddleware.handle(i18n));

app.use((req, res, next) => {
  if (req.path.includes('/client/locales')) {
    return next();
  }
  // Creates empty store for each request
  const store = configureStore();
  // Perform pre-fetches
  const branch = matchRoutes([{ app: App, routes: routesConfig }], req.url);
  let locale = req.language;
  let currentMatch; // We need this to pass back to ensure we have any params
  branch.map(({ match }) => {
    if (match && match.params && Object.keys(match.params).length > 0) {
      if (match.params.language && CONFIG.languages.indexOf(match.params.language) !== -1) {
        locale = match.params.language;
        currentMatch = match.params.language;
      }
    }
  });
  const promises = branch.map(({ route }) => {
    if (route.component && route.component.getInitialProps && route.path !== '*') {
      const getInitialProps = route.component.getInitialProps;
      const authToken = getToken(req);
      if (getInitialProps instanceof Function && currentMatch) {
        return getInitialProps(store, currentMatch, authToken);
      }
    }
    return Promise.resolve(null);
  });
  // Handle locales
  const resources = i18n.getResourceBundle(locale, 'common');
  const i18nClient = { locale, resources };
  const i18nServer = i18n.cloneInstance();
  i18nServer.changeLanguage(locale);
  return Promise.all(promises).then(() => {
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
    const serverHtml = getServerHtml(appHtml, dehydratedState, helmet, sheet, i18nClient);

    // Context has url, which means `<Redirect>` was rendered somewhere
    if (context.url) {
      return res.redirect(301, context.url);
    }
    // We're good, send the response
    return res.status(context.status || 200).send(serverHtml);
  });

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