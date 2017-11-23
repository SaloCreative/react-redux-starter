import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';

// ROUTES
import Routes from '../index';

// STYLED COMPONENTS
const Body = styled.div`
    width: 100%;
    padding: 20px;
`;

class App extends Component {
  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 0);
    }
  }

  render() {
    return (
      <Body className='App'>
        <Helmet titleTemplate='%s | Salo Creative' />
        { Routes(this.props) }
      </Body>
    );
  }
}
export default App;