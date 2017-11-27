import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { translate } from 'react-i18next';

// HOC
import Page from '../../hoc/page';
import { testFetch } from '../../actions/test';
import { usersFetch } from '../../actions/users';

// COMPONENTS

class Home extends Component {
  /**
   * @static getInitialProps
   * @param { object } token - passes back authtoken if present as a cookie  for use in actions;
   * @param { object } match - passes any matched params from the router back (e.g. language);
   * @param store - passes in an instance of the redux store for dispatch & reducers
   * @returns Promise - returns a promise for server render
   */
  static getInitialProps(store, match, token) {
    return Promise.all([
      store.dispatch(testFetch()),
      store.dispatch(usersFetch())
    ]);
  }
  
  componentDidMount() {
    if (!this.loadedPost()) {
      this.props.testFetch();
    }
    if (!this.loadedUsers()) {
      this.props.usersFetch();
    }
  }

  loadedPost() {
    const { test } = this.props;
    return !test.fetching && !test.error && Object.keys(test.data).length;
  }

  loadedUsers() {
    const { users } = this.props;
    return !users.fetching && !users.error && users.data.length;
  }

  renderContent() {
    const { test } = this.props;
    if (this.loadedPost()) {
      return ([
        <h1 key='title'>{ test.data.title }</h1>,
        <p key='body'>{ test.data.body }</p>
      ]);
    }
    return <p>Fetching</p>;
  }

  renderUsers() {
    const { users } = this.props;
    if (this.loadedUsers()) {
      return (
        <table width='100%'>
          <thead>
            <tr>
              <th>id</th>
              <th>Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            { users.data.map((user) => {
              return (
                <tr key={ user.id }>
                  <td>{ user.id }</td>
                  <td>{ user.name }</td>
                  <td>{ user.email }</td>
                </tr>
              );
            }) }
          </tbody>
        </table>
      );
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
        <h1>{ t('HOME') }</h1>
        { this.renderContent() }
        { this.renderUsers() }
      </div>
    ]);
  }
}

Home.propTypes = {
  t: PropTypes.func.isRequired,
  testFetch: PropTypes.func.isRequired,
  usersFetch: PropTypes.func.isRequired,
  test: PropTypes.object.isRequired,
  users: PropTypes.object.isRequired
};

export default translate(['common'])(Page(Home));