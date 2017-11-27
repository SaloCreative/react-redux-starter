# Setup

first of all clone down the repo and then run `yarn` to pull in all the dependencies

```
$ yarn
```

## Development

There are two development environments for this application. 

### Client development

First there is a basic develoment mode that hot reloads the client application. This can be started by simply running 

```
$ npm start
```

Visit `http://localhost:8001/` from your browser of choice.

### Universal development

```
$ npm run universal:dev
```

Visit `http://localhost:8080/` from your browser of choice.



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

## All npm tasks

* `start` - starts client app only in development mode, using webpack dev server
* `client:dev` - same as `start` plus fancy webpack dashboard
* `client:build` - builds client application for `production` environment
* `server:dev` - starts server app only in development mode (use for testing server responses)
* `universal:dev` - runs both server and client in watch mode, automatically restarts server on changes
* `universal:build` - builds both server and client for `production` environment

there are additional tasks that are run as part of build and dev tasks but these should not be run in isolation. There are also 2 aliases currently in place for legacy build tasks


## Credit

Thanks to [Work & Co](https://github.com/workco/marvin) for the starting point for this project. Workco's starter project gave the basic structure and approach for this starter kit

## Contributors

* [Work & Co](https://github.com/worko)
* [James Bliss](https://github.com/jamesbliss)
* [Tim Stone](https://github.com/fetimo)