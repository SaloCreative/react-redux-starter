import React from 'react';
import { Router, Route } from 'react-router-dom';
import AppContainer from './container';
import history from '../../config/browserHistory';

export default () => (
  <Router history={ history }>
    <Route component={ AppContainer } />
  </Router>
);