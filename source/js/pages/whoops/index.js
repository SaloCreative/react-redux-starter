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
        <title>{t('WHOOPS')}</title>
      </Helmet>,
      <div key='page' className='error-message'>
        <div className='error-message__container'>
          <a onClick={ () => history.go(-1) } role='button' tabIndex='-1'>Back</a>
          <h2 className='error-message__title'>{t('WHOOPS_TITLE')}</h2>
          <p className='error-message__text'>{t('WHOOPS_TEXT')}</p>
        </div>
      </div>
    ]);
  }
}

NotFound.propTypes = {
  t: PropTypes.func.isRequired
};

export default translate(['common'])(Page(NotFound));