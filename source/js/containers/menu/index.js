import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { translate } from 'react-i18next';

import { routeCodes } from '../../routes';
import Logo from '../../../assets/img/logo-full.png';

class Menu extends Component {
  render() {
    const { match, t } = this.props;
    const language = match.params.language ? match.params.language : 'en';
    return (
      <div className='Menu'>
        <div className='Menu-logo'>
          <img
            src={ Logo }
            alt='Salo Creative logo'
          />
        </div>
        <div className='Menu-links'>
          <NavLink
            activeClassName='Menu-link--active'
            className='Menu-link'
            exact
            to={ routeCodes.HOME.replace(':language', language) }
          >
            { t('HOME') }
          </NavLink>
          <NavLink
            activeClassName='Menu-link--active'
            className='Menu-link'
            to={ routeCodes.ABOUT.replace(':language', language) }
          >
            { t('ABOUT') }
          </NavLink>
          <NavLink
            activeClassName='Menu-link--active'
            className='Menu-link'
            to={ routeCodes.FOUROHFOUR.replace(':language', language) }
          >
            { t('404') }
          </NavLink>
        </div>
      </div>
    );
  }
}

Menu.propTypes = {
  match: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired
};

export default translate(['common'])(Menu);