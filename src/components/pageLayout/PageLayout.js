import React, { Component } from 'react';
import Header from './header/header.js';
import './style.css';
import SideMenu from '../sideMenu/SideMenu';
import AddTaskModal from "../addTask/addTaskModal/AddTaskModal";

export default class PageLayout extends Component {
  render() {
    return (
      <div className='page-layout'>
        <Header/>
        <SideMenu/>
        <div className='content'>
            {this.props.children}
          <AddTaskModal
            modalType={'add'}
            has={null}
            task={{taskName: ''}}
          />
        </div>
      </div>
    );
  }
}

PageLayout.propTypes = {
  children: React.PropTypes.node
};