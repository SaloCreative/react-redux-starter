import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';

// ROUTES
import Routes from '../index';

// HOC
import { ScreenSize } from '../../hoc/screenSize';

// STYLED COMPONENTS
const Body = styled.div`
  ${ props => (props.lock ? `
    height: 100vh;
    width: 100%;
    overflow: hidden;
  ` : '') }
`;

class App extends Component {
  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 0);
    }
  }

  render() {
    return (
      <Body className='App' lock={ bodyLock ? 1 : 0 }>
        <Helmet titleTemplate='%s | Salo Creative' />
        { Routes(this.props) }
      </Body>
    );
  }
}
export default ScreenSize(App);