import React, { Component } from 'react';
import i18next from 'i18next';
import hoistNonReactStatic from 'hoist-non-react-statics';
import { isEmpty } from 'lodash';

import { goToNotFound, isBrowser } from '../helpers';
import { getAllContent } from '../actions/getAllContent';
import { languages } from '../config/constants';
import Loader from '../components/loader';

function getDisplayName(ComposedComponent) {
  return ComposedComponent.displayName || ComposedComponent.name || 'Component';
}

export default function Blanket(ComposedComponent) {
  class composedBlanket extends Component {
    static getInitialProps(store, language, token) {
      return store.dispatch(getAllContent(language, token.JWT));
    }

    componentWillMount() {
      const { match } = this.props;
  
      const languageChanged = match.params.language !== i18next.language;
      const languageWhitelist = languages;
      const languageInWhitelist = languageWhitelist.indexOf(match.params.language) !== -1;
  
      if (match.params.language) {
        if (!languageInWhitelist) { goToNotFound(); }
        if (languageChanged) {
          i18next.changeLanguage(match.params.language);
          try {
            localStorage.clear();
            localStorage.setItem('version', VERSION);
          } catch (e) {
            // console && console.log('could not set');
          }
        }
      }
    }

    componentDidMount() {
      const { content, channels, categories, businessUnits, homepage, tags, match } = this.props;
      const loaded = tags.last_updated && homepage.last_updated && content.last_updated && categories.last_updated && channels.last_updated && businessUnits.last_updated;
      if (loaded) {
        if ((Date.now() - content.last_updated) / 1000 > 1800) {
          this.props.getAllContent(match.params.language);
        }
      } else {
        this.props.getAllContent(match.params.language);
      }
    }
    
    render() {
      const { content, channels, categories, businessUnits, homepage, tags, match } = this.props;
      const loading = tags.fetching || isEmpty(tags.data) || homepage.fetching || isEmpty(homepage.data) || content.fetching || isEmpty(content.data) || categories.fetching || isEmpty(categories.data) || channels.fetching || isEmpty(channels.data) || businessUnits.fetching || isEmpty(businessUnits.data);

      return ([
        loading && isBrowser && <Loader key='loader' ready={ !loading } />,
        !loading && <ComposedComponent key='component' { ...this.props } />
      ]);
    }
  }
  hoistNonReactStatic(composedBlanket, ComposedComponent);
  composedBlanket.displayName = `Blanket(${ getDisplayName(ComposedComponent) })`;
  return composedBlanket;
}