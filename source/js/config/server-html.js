import React from 'react';
import ReactDOMServer from 'react-dom/server';
import PropTypes from 'prop-types';

import { outputFiles } from '../../../webpack/output-files';

const ServerHtml = ({ appHtml, dehydratedState, helmet, styles }) => (
  <html lang='en'>
    <head>
      <meta charSet='utf-8' />
      <meta name='viewport' content='width=device-width, initial-scale=1.0, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0' />

      { helmet.title.toComponent() }
      { helmet.meta.toComponent() }
      { styles.getStyleElement() }
      <link rel='shortcut icon' type='image/png' href={ `/${ outputFiles.favicon }` } />
      <link rel='stylesheet' href={ `/${ outputFiles.css }` } />
    </head>
    <body>
      <div id='root' dangerouslySetInnerHTML={ { __html: appHtml } } />
      <script type='text/javascript' dangerouslySetInnerHTML={ { __html: `var __SALO_CREATIVE_DEHYDRATED_STATE = ${ dehydratedState };` } } />
      <script type='text/javascript' src={ `/${ outputFiles.vendor }` } />
      <script type='text/javascript' src={ `/${ outputFiles.client }` } />
      <script src='https://cdn.polyfill.io/v2/polyfill.min.js' />
    </body>
  </html>
);

ServerHtml.propTypes = {
  appHtml: PropTypes.string.isRequired,
  dehydratedState: PropTypes.string.isRequired,
  helmet: PropTypes.any.isRequired,
  styles: PropTypes.any.isRequired
};

const getServerHtml = (appHtml, dehydratedState = null, helmet, styles) => {
  return `<!doctype html>${ ReactDOMServer.renderToString(<ServerHtml appHtml={ appHtml } dehydratedState={ dehydratedState } helmet={ helmet } styles={ styles } />) }`;
};

export default getServerHtml;