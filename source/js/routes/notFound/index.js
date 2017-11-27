import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';

// HOC
import Page from '../../hoc/page';

class NotFound extends Component {
  render() {
    const { t } = this.props;

    return ([
      <Helmet key='helmet'>
        <title>{t('HOME')}</title>
      </Helmet>,
      <div key='page' className='error-message'>
        <div className='error-message__container'>
          <h2 className='error-message__title'>{ t('ERROR_TITLE') }</h2>
          <p className='error-message__text'>{ t('ERROR_TEXT') }</p>
        </div>
      </div>
    ]);
  }
}

NotFound.propTypes = {
  t: PropTypes.func.isRequired
};

export default translate(['common'])(Page(NotFound));