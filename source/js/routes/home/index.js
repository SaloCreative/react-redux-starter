import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { translate } from 'react-i18next';

// HOC
import Page from '../../hoc/page';
import { testFetch } from '../../actions/test';

// COMPONENTS

class Home extends Component {
  static getInitialProps(store) {
    return store.dispatch(testFetch());
  }
  
  componentDidMount() {
    if (!this.loaded()) {
      this.props.testFetch();
    }
  }

  loaded() {
    const { test } = this.props;
    return !test.fetching && !test.error && Object.keys(test.data).length;
  }

  renderContent() {
    const { test } = this.props;
    if (this.loaded()) {
      return ([
        <h1 key='title'>{ test.data.title }</h1>,
        <p key='body'>{ test.data.body }</p>
      ]);
    }
    return <p>Fetching</p>;
  }
  
  render() {
    const { t } = this.props;
    return ([
      <Helmet key='helmet'>
        <title>{ t('HOME') }</title>
      </Helmet>,
      <div key='page'>
        { t('HOME') }
        { this.renderContent() }
      </div>
    ]);
  }
}

Home.propTypes = {
  t: PropTypes.func.isRequired,
  testFetch: PropTypes.func.isRequired,
  test: PropTypes.object.isRequired
};

export default translate(['common'])(Page(Home));