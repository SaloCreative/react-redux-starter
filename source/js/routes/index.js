import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import APP from './app';

// Home
import HOME from './home';
import SEARCH from './search';
import LISTING from './listing';
import ARTICLE from './article';
import HUB from './hub';
import PRODUCTS from './products';
import PRODUCT from './product';
import EVENT from './event';
import SESSION from './session';
import AGENDA from './agenda';
import MAPS from './maps';

// Misc Routes
import NotFound from './notFound';
import WHOOPS from './whoops';

// Helper route codes
export const routeCodes = {
  HOME: '/:language',
  SEARCH: '/:language/search',
  WHOOPS: '/:language/whoops',
  AGENDA: '/:language/my-agenda',
  THENAKEDHUB: '/:language/thenakedhub',
  PRODUCTS: '/:language/products/:categoryID',
  PRODUCT: '/:language/products/:categoryID/:productID',
  MAPS: '/:language/maps',
  VENUEMAPS: '/:language/maps/venue/:venueID',
  VENUEMAP: '/:language/maps/venue/:venueID/map/:mapID',
  EVENT: '/:language/event/:eventID',
  SESSION: '/:language/event/:eventID/:sessionID',
  LISTING: '/:language/:listingID',
  ARTICLE: '/:language/:listingID/:articleID',
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
      { path: routeCodes.SEARCH,
        exact: true,
        component: SEARCH
      },
      { path: routeCodes.THENAKEDHUB,
        exact: true,
        component: HUB
      },
      { path: routeCodes.EVENT,
        exact: true,
        component: EVENT
      },
      { path: routeCodes.SESSION,
        exact: true,
        component: SESSION
      },
      { path: routeCodes.AGENDA,
        exact: true,
        component: AGENDA
      },
      { path: routeCodes.MAPS,
        exact: true,
        component: MAPS
      },
      { path: routeCodes.VENUEMAPS,
        exact: true,
        component: MAPS
      },
      { path: routeCodes.VENUEMAP,
        exact: true,
        component: MAPS
      },
      { path: routeCodes.PRODUCTS,
        exact: true,
        component: PRODUCTS
      },
      { path: routeCodes.PRODUCT,
        exact: true,
        component: PRODUCT
      },
      { path: routeCodes.FOUROHFOUR,
        exact: true,
        component: NotFound
      },
      { path: routeCodes.LISTING,
        exact: true,
        component: LISTING
      },
      { path: routeCodes.ARTICLE,
        exact: true,
        component: ARTICLE
      },
      { path: '*',
        exact: false,
        component: NotFound
      },
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