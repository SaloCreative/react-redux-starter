import { createStore, applyMiddleware, compose } from 'redux';
import { apiMiddleware } from '@aftonbladet/redux-api-middleware';
import 'babel-polyfill';
import thunk from 'redux-thunk';

import logger from '../dev/logger';
import DevTools from '../dev/redux-dev-tools';

// Import the root reducer
import rootReducer from '../reducers';

const isProduction = process.env.NODE_ENV !== 'development';

let INIT_STATE = null;

try {
  INIT_STATE = __SALO_CREATIVE_DEHYDRATED_STATE; // eslint-disable-line no-undef
} catch (e) {
  console.log('Salo Creative: No dehydrated state'); // eslint-disable-line no-console
}

if (typeof INIT_STATE === 'string') {
  INIT_STATE = JSON.parse(INIT_STATE); // NOT SURE WE NEED THIS, TIM & RICH CAN "ADVISE"
}

export default () => {
  let store = null;
  let middleware = null;

  if (isProduction) {
    // In production avoid dev tools
    middleware = applyMiddleware(thunk, apiMiddleware);
  } else {
    // In development logger and DevTools are added
    middleware = applyMiddleware(thunk, apiMiddleware, logger);

    // Enable DevTools if browser extension is installed
    if (!process.env.SERVER_RENDER && window.__REDUX_DEVTOOLS_EXTENSION__) { // eslint-disable-line
      middleware = compose(
        middleware,
        // DevTools.instrument(),
        window.__REDUX_DEVTOOLS_EXTENSION__() // eslint-disable-line
      );
    }
  }

  // Add dehydrated state if any
  if (INIT_STATE) {
    // Remove if you are not using server rendering
    store = createStore(
      rootReducer,
      INIT_STATE,
      middleware
    );
  } else {
    store = createStore(
      rootReducer,
      middleware
    );
  }

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers/index').default; // eslint-disable-line global-require
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
};