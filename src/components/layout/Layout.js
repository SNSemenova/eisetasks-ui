import React, { Component } from 'react';
import './style.css';

export default class Layout extends Component {
  render() {
    return (
      <div className='layout'>
        	{this.props.children}
      </div>
    );
  }
}

Layout.propTypes = {
  children: React.PropTypes.node
};