import React, { Component } from 'react';
import './style.css';

class FormLayout extends Component {

  render() {
    return (
      <div className="form-layout">
        <div className="logo"> 
          <div className="logo__image" />  
          <div className="logo__title" > Eise Tasks </div>  
        </div>      
        <div className="form_container">
          {this.props.children}
        </div>
      </div>
    );
  }
}

FormLayout.propTypes = {
  children: React.PropTypes.node
};

export default FormLayout;