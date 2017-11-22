import React from 'react';
import PropTypes from 'prop-types';
import { StaticRouter, Route } from 'react-router-dom';
import AppContainer from '../../containers/root/appContainer';

const Server = ({ location, context }) => (
  
  <StaticRouter location={ location } context={ context }>
    <Route component={ AppContainer } />
  </StaticRouter>
);

Server.propTypes = {
  location: PropTypes.string,
  context: PropTypes.object
};

export default Server;