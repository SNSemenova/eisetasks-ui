import React, { Component } from 'react';
import './style.css';

export default class ItemList extends Component {
    
  render() {
    return (
      <div className="list">
        {this.props.children}   
      </div>
      );
  }
}