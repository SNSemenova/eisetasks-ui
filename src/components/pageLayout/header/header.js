import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './header.css';
import { I18n } from 'react-redux-i18n';
import Burger from '../../burger/Burger';
import AddTaskInput from '../../addTask/addTaskInput/AddTaskInput';
import LogoutButton from "../../logoutButton/LogoutButton";

export default class header extends Component {
  render() {
    return (
      <div>
      <header className='header'>
        <Burger />
        <div className='header__container'>
          <NavLink exact className='header__logo' to='/'>
            <div className='header__logo_img' />
            Eise Tasks
          </NavLink>
          <AddTaskInput/>
          <nav className='header__nav'>
            <NavLink
              to='/'
              exact
              className='nav__ref'
              activeClassName='nav__ref nav__ref-line'>
              {I18n.t('layout.menu.todayTasks')}
            </NavLink>
            <NavLink
              className='nav__ref'
              activeClassName='nav__ref-line nav__ref' to='/inbox'>
              {I18n.t('layout.menu.inboxTasks')}
            </NavLink>
            <NavLink
              className='nav__ref'
              activeClassName='nav__ref nav__ref-line'
              to='/postponed'>
              {I18n.t('layout.menu.postponedTasks')}
            </NavLink>
            <NavLink
              className='nav__ref'
              activeClassName='nav__ref nav__ref-line'
              to='/done'>
              {I18n.t('layout.menu.doneTasks')}
            </NavLink>
          </nav>
          <LogoutButton/>
        </div>
      </header>          
      </div>
    );
  }
}
