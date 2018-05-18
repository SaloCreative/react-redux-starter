import React from 'react';
import PropTypes from 'prop-types';
import { StaticRouter, Route } from 'react-router-dom';
import AppContainer from './container';

const Server = ({ location, context }) => (
  
  <StaticRouter location={ location } context={ context }>
    <Route component={ AppContainer } />
  </StaticRouter>
);

Server.propTypes = {
  location: PropTypes.string.isRequired,
  context: PropTypes.object.isRequired
};

export default Server;