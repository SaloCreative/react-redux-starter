import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

// COMPONENTS
import Home from './home';
import NotFound from './notFound';
import Whoops from './whoops';

// ROUTES
import { HOME, ABOUT, WHOOPS, FOUROHFOUR } from '../config/pages';

export const routesConfig = [
  {
    exact: true,
    component: Home,
    ...HOME
  },
  {
    exact: true,
    component: Whoops,
    ...WHOOPS
  },
  {
    exact: true,
    component: NotFound,
    ...FOUROHFOUR
  },
  {
    exact: true,
    component: NotFound,
    ...ABOUT
  }
];

// Route Component
export default function renderRoutes(props) {
  return (
    <Switch>
      <Redirect exact path='/' to='/en' />
      { routesConfig.map(route => {
        return (
          <Route
            key={ route.path }
            exact={ route.exact }
            path={ route.path }
            render={ (routeProps) => <route.component { ...props } match={ routeProps.match } /> }
          />
        );
      }) }
    </Switch>
  );
}