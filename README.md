# Introduction

A simple **S**ingle **P**age **A**pplication (SPA) relies on fetching and rendering all the data on the client side. For some applications this is fine, especially hobby projects, but for any application that needs to be accessible, shareable or SEO friendly then we need to be able to pre-fetch data on the server side and render a fully formed view without loading the app first. 

Having worked on a number of React-Redux apps recently that require localisations, server side rendering and pre-fetches I have put together this project with the following aims:

* React-Redux based application
* Utilising React Router 4
* Middleware/Auth handling
* A universally rendered application
* Server side fetches
* Multi-lingual and translatable

# Setup

first of all clone down the repo and then run `yarn` to pull in all the dependencies

```
$ yarn
```

## Development

There are two development environments for this application. 

### Client development

There is a basic develoment mode that hot reloads the client application with no need for refreshing and does not utilise any of the server side code. This can be started by simply running 

```
$ npm start
```

and then visiting `http://localhost:8001/` from your browser of choice.

### Universal development

Universal development allows for development on both the client and server application concurrently with watch tasks to rebuild the files. Hot reload will not work, so you need to refresh the page manually after changing the code

```
$ npm run universal:dev
```

and then visit `http://localhost:8080/` from your browser of choice.


## Build

Build will be placed in the `build` folder. As with the development mode there are two build processes, one for client only and one for a server side rendered application. 

### Client

For a simple client only build you can run

```
$ npm run client:build
```

and then just serve `index.html` from the build folder and voila your application is minified and running in production. No need for a node process or anything clever

### Server Side / Universal build

A client side application is all well and good but for any application that needs to be accessible, shareable or SEO friendly then we need to be able to pre-fetch data on the server side before we render the application. 

## All npm tasks

* `start` - starts client app only in development mode, using webpack dev server
* `client:dev` - same as `start` plus fancy webpack dashboard
* `client:build` - builds client application for `production` environment
* `server:dev` - starts server app only in development mode (use for testing server responses)
* `universal:dev` - runs both server and client in watch mode, automatically restarts server on changes
* `universal:build` - builds both server and client for `production` environment

there are additional tasks that are run as part of build and dev tasks but these should not be run in isolation. There are also 2 aliases currently in place for legacy build tasks


# Credit

Thanks to [Work & Co](https://github.com/workco/marvin) for the starting point for this project. Workco's starter project gave the basic structure and approach for this starter kit

## Contributors

* [Work & Co](https://github.com/worko)
* [James Bliss](https://github.com/jamesbliss)
* [Tim Stone](https://github.com/fetimo)