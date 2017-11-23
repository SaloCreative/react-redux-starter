import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { translate } from 'react-i18next';

// HOC
import Page from '../../hoc/page';

// COMPONENTS

class Home extends Component {
  render() {
    const { t } = this.props;
    return ([
      <Helmet key='helmet'>
        <title>{ t('HOME') }</title>
      </Helmet>,
      <div key='page'>
        { t('HOME') }
      </div>
    ]);
  }
}

Home.propTypes = {
  t: PropTypes.func.isRequired
};

export default translate(['common'])(Page(Home));