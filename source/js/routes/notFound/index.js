import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';

// HOC
import Blanket from '../../hoc/blanket.ssr';
import Page from '../../hoc/page';

class NotFound extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
    closeNavigation: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired,
    login: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired
  }

  componentWillMount() {
    const { navigation, closeNavigation } = this.props;
    if (navigation.isActive) closeNavigation();
  }

  renderMessage() {
    const { t, login } = this.props;
    if (login && login.token && (login.grants.indexOf('beta.admin') > -1 || login.grants.indexOf('beta.staff') > -1)) {
      // if logged in and approved.
      return <p className='error-message__text'>{t('ERROR_TEXT_LOGGED_IN_APPROVED')}</p>;
    }
    if (login && login.token) {
      // if logged in.
      return <p className='error-message__text'>{t('ERROR_TEXT_LOGGED_IN')}</p>;
    }
    return <p className='error-message__text'>{t('ERROR_TEXT')}</p>;
  }

  render() {
    const { t } = this.props;

    return ([
      <Helmet key='helmet'>
        <title>{t('HOME')}</title>
      </Helmet>,
      <div key='page' className='error-message'>
        <Container>
          <div className='error-message__container'>
            <a onClick={ () => history.go(-2) } role='button' tabIndex='-1'><Icon icon='long-arrow-left' size='24px' /></a>
            <h2 className='error-message__title'>{t('ERROR_TITLE')}</h2>
            { this.renderMessage() }
          </div>
        </Container>
      </div>
    ]);
  }
}

export default translate(['common'])(Blanket(Page(NotFound)));