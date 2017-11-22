import React, { Component } from 'react';
import { connect } from 'react-redux';

// ACTIONS
import { updateScreenSize } from '../actions/screen';

export const ScreenSize = ComposedComponent => class extends Component {
  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', () => this.updateWindowDimensions());
  }

  componentWillUnmount() {
    window.removeEventListener('resize', () => this.updateWindowDimensions());
  }

  updateWindowDimensions() {
    const { screen, updateScreenSize } = this.props;
    updateScreenSize({ height: window.innerHeight, width: window.innerWidth });
  }

  render() {
    return <ComposedComponent { ...this.props } />;
  }
};


export default connect(({ screen }) => ({ screen }), { updateScreenSize })(ScreenSize);