import React, { Component } from 'react';
import { clearFlag } from './action';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import './style.css';


class InputField extends Component {

  static contextTypes = {
    router: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
    let fieldtype = this.props.changableVisibility ? 'password' : 'text';
    this.state = {
      type: fieldtype
    }
  }

  eyeClass() {
    if (this.props.type === 'password')
      if (this.props.value > 0)
        return 'password-eye password-eye_typed';
      else return 'password-eye';
    else
      return 'password-eye password-eye_active'
  }

  showHide() {
    this.setState({
      type: this.state.type === 'text' ? 'password' : 'text'
    })
  }

  onClick() {
    this.props.clearFlag();
  }

  render() {
    return (
      <div>
        <div className={this.props.labelClassName}>
          {this.props.label}
        </div>
        <input type={this.state.type}
               value={this.props.value}
               className={this.props.className}
               onChange={this.props.onChange}
               onClick={this.onClick}
               placeholder={this.props.placeholder}
        />
        <div className={this.eyeClass()} onClick={this.showHide.bind(this)} hidden={!this.props.changableVisibility}/>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  clearFlag: bindActionCreators(clearFlag, dispatch)
});

export default connect(null, mapDispatchToProps)(InputField);