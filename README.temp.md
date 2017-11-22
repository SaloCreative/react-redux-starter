# Setup

```
$ yarn
```

## Running in dev mode

```
$ npm start
```

Visit `http://localhost:8001/` from your browser of choice.
Server is visible from the local network as well.

## Build (production)

Build will be placed in the `build` folder.

```
$ npm run build
```

## Running in preview production mode

This command will start webpack dev server, but with `NODE_ENV` set to `production`.
Everything will be minified and served.
Hot reload will not work, so you need to refresh the page manually after changing the code.

```
npm run preview
```

## npm tasks

* `start` - starts client app only in development mode, using webpack dev server
* `client:dev` - same as `start` plus fancy webpack dashboard
* `client:build` - builds client application for `staging` environment
* `client:build-prod` - builds client application for `production` environment
* `server:dev` - starts server app only in development mode (use for testing server responses)
* `universal:dev` - runs both server and client in watch mode, automatically restarts server on changes
* `universal:build` - builds both server and client for `staging` environment
* `universal:build-prod` - builds both server and client for `production` environment

there are additional tasks that are run as part of build and dev tasks but these should not be run in isolation. There are also 2 aliases currently in place for legacy build tasks

## change app directory

If your app is not running on the server root you should change `publicPath` at two places.

In `webpack.config.js` (ATM line 147):

```
output: {
  path: buildPath,
  publicPath: '/your-app/',
  filename: 'app-[hash].js',
},
```

and in `source/js/routes` (ATM line 9):

```
const publicPath = '/your-app/';
```

Don't forget the trailing slash (`/`). In development visit `http://localhost:3001/your-app/`.