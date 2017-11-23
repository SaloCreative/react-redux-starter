import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import APP from './app';

// Home
import HOME from './home';

// Misc Routes
import NotFound from './notFound';
import WHOOPS from './whoops';

// Helper route codes
export const routeCodes = {
  HOME: '/:language',
  WHOOPS: '/:language/whoops',
  FOUROHFOUR: '/:language/404'
};

export const routerConf = [
  { component: APP,
    routes: [
      { path: routeCodes.HOME,
        exact: true,
        component: HOME
      },
      { path: routeCodes.WHOOPS,
        exact: true,
        component: WHOOPS
      },
      { path: routeCodes.FOUROHFOUR,
        exact: true,
        component: NotFound
      }
    ]
  }
];

// Render routes function
function renderRoutes(routes, props) {
  return (routes.map(route => {
    return (
      <Route
        key={ route.path }
        exact={ route.exact }
        path={ route.path }
        render={ (routeProps) => <route.component { ...props } match={ routeProps.match } /> }
      />
    );
  }));
}

// Route Component
export default function Routes(props) {
  const routes = renderRoutes(routerConf[0].routes, props);
  return (
    <Switch>
      <Redirect exact path='/' to='/en' />
      { routes }
    </Switch>
  );
}