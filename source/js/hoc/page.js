import React, { Component } from 'react';
import hoistNonReactStatic from 'hoist-non-react-statics';

import Header from '../components/header';
import Footer from '../components/footer';
import OnBoarding from '../components/onBoarding';
import ErrorBoundary from '../components/errorBoundary';

function getDisplayName(ComposedComponent) {
  return ComposedComponent.displayName || ComposedComponent.name || 'Component';
}

export default function Page(ComposedComponent) {
  // ...and returns another component...
  class composedPage extends Component {
    render() {
      const { login, match } = this.props;
  
      return (
        <ErrorBoundary>
          <div className='page'>
            <Header user={ login.user } match={ match } />
  
            <main className='page__content'>
              <ComposedComponent { ...this.props } />
            </main>
  
            <Footer />
  
            <OnBoarding />
          </div>
        </ErrorBoundary>
      );
    }
  }
  hoistNonReactStatic(composedPage, ComposedComponent);
  composedPage.displayName = `Page(${ getDisplayName(ComposedComponent) })`;
  return composedPage;
}