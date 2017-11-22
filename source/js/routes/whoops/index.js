import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';

// HOC
import Blanket from '../../hoc/blanket.ssr';
import Page from '../../hoc/page';

class NotFound extends Component {
  static propTypes = {
    location: PropTypes.object.isRequired,
    login: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired
  }

  render() {
    const { t } = this.props;

    return ([
      <Helmet key='helmet'>
        <title>{t('WHOOPS')}</title>
      </Helmet>,
      <div key='page' className='error-message'>
        <Container>
          <div className='error-message__container'>
            <a onClick={ () => history.go(-1) } role='button' tabIndex='-1'><Icon icon='long-arrow-left' size='24px' /></a>
            <h2 className='error-message__title'>{t('WHOOPS_TITLE')}</h2>
            <p className='error-message__text'>{t('WHOOPS_TEXT')}</p>
          </div>
        </Container>
      </div>
    ]);
  }
}

export default translate(['common'])(Blanket(Page(NotFound)));