import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { routeCodes } from '../../routes';
import workAndCoLogoImg from '../../../assets/img/favicon.png';

export default class Menu extends Component {
  render() {
    const { match } = this.props;
    const language = match.params.language ? match.params.language : 'en';
    return (
      <div className='Menu'>
        <div className='Menu-logo'>
          <img
            src={ workAndCoLogoImg }
            alt='Work & Co logo'
          />
        </div>
        <div className='Menu-links'>
          <NavLink
            activeClassName='Menu-link--active'
            className='Menu-link'
            exact
            to={ routeCodes.HOME.replace(':language', language) }
          >
            Home
          </NavLink>
          <NavLink
            activeClassName='Menu-link--active'
            className='Menu-link'
            to={ routeCodes.ABOUT.replace(':language', language) }
          >
            About
          </NavLink>
          <NavLink
            activeClassName='Menu-link--active'
            className='Menu-link'
            to={ routeCodes.FOUROHFOUR.replace(':language', language) }
          >
            404
          </NavLink>
        </div>
      </div>
    );
  }
}

Menu.propTypes = {
  match: PropTypes.object.isRequired
};