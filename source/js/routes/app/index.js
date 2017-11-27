import React, { Component } from 'react';
import { Helmet } from 'react-helmet';

import Menu from '../../containers/menu';

// ROUTES
import Routes from '../index';

class App extends Component {
  componentDidUpdate(prevProps) {
    const { location } = this.props;
    if (location !== prevProps.location) {
      window.scrollTo(0, 0);
    }
  }

  render() {
    const { match } = this.props;
    return (
      <div className='App'>
        <Helmet titleTemplate='%s | Salo Creative' />
        <Menu match={ match } />
        <div className='Page'>
          { Routes(this.props) }
        </div>
      </div>
    );
  }
}
export default App;