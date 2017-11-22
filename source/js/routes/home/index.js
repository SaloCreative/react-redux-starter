import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { translate } from 'react-i18next';

// HOC
import Blanket from '../../hoc/blanket.ssr';
import Page from '../../hoc/page';

// COMPONENTS

class Home extends Component {
  render() {
    return ([
      <Helmet key='helmet'>
        <title>Home</title>
      </Helmet>,
      <div key='page'>
        Home page
      </div>
    ]);
  }
}

Home.propTypes = {
};

export default translate(['common'])(Blanket(Page(Home)));