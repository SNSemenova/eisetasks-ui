import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import { I18n } from 'react-redux-i18n';
import './style.css'

export default class SideMenu extends Component {
  
  render() {
    return (
      <div className='side-menu'>
        <NavLink to='/'
                 exact
                 className='side-menu__link side-menu__todo'
                 activeClassName='side-menu__link-active side-menu__todo-active'>
          {I18n.t('layout.menu.todayTasks')}
        </NavLink>
        <NavLink to='/inbox'
                 className='side-menu__link side-menu__inbox'
                 activeClassName='side-menu__link-active side-menu__inbox-active'>
          {I18n.t('layout.menu.inboxTasks')}
        </NavLink>
        <NavLink to='/postponed'
                 className='side-menu__link side-menu__postponed'
                 activeClassName='side-menu__link-active side-menu__postponed-active'>
          {I18n.t('layout.menu.postponedTasks')}
        </NavLink>
        <NavLink to='/done'
                 className='side-menu__link side-menu__done'
                 activeClassName='side-menu__done-active'>
          {I18n.t('layout.menu.doneTasks')}
        </NavLink>
      </div>
    )
  }
}