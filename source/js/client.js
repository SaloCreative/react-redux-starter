import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { I18nextProvider } from 'react-i18next'; // as we build ourself via webpack
import { Provider } from 'react-redux';
import 'babel-polyfill';
import 'isomorphic-fetch';

import configureStore from './config/store';
import i18n from './i18n'; // initialised i18next instances
import Client from './routes/app/client';

// Load SCSS
import '../scss/app.scss';

const store = configureStore();
// Defined by webpack.
const version = VERSION;

// Ensure latest version.
if (localStorage) {
  if (version !== localStorage.getItem('version')) {
    localStorage.clear();
    try {
      localStorage.setItem('version', version);
    } catch (e) {
      console && console.log('could not set');
    }
  }
}

function buildI18nStore() {
  if (window.__i18n) {
    return {
      [window.__i18n.locale]: {
        common: window.__i18n.resources
      }
    };
  }
}

const render = Component => {
  ReactDOM.hydrate(
    <AppContainer warnings={ false }>
      <I18nextProvider i18n={ i18n } initialI18nStore={ buildI18nStore() } initialLanguage={ window.__i18n ? window.__i18n.locale : '' }>
        <Provider store={ store }>
          <Component />
        </Provider>
      </I18nextProvider>
    </AppContainer>,
    document.getElementById('root')
  );
};

// Render app
render(Client);

if (module.hot) {
  module.hot.accept('./routes/app/client', () => {
    const NewClient = require('./routes/app/client').default; // eslint-disable-line global-require
    render(NewClient);
  });
}