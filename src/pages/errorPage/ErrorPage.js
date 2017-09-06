import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import { I18n } from 'react-redux-i18n';

import './style.css';

export default class ErrorPage extends Component {

  constructor(props) {
    super(props);
    this.state = {};

    this.getErrMessage = this.getErrMessage.bind(this);
    this.getMonkeyMessage = this.getMonkeyMessage.bind(this);
    this.changeMessage = this.changeMessage.bind(this);
  }

  componentDidMount() {
    this.setState({
      errCode: this.props.code,
      errMessage: I18n.t(`pages.error.error_messages.${this.props.code}`),
      monkeyMessage: I18n.t(`pages.error.monkey_messages.${this.props.code}`)
    })
  }

  getMonkeyMessage(k) {
    return this.monkey_messages[k];
  }

  getErrMessage(k) {
    return this.error_messages[k];
  }

  changeMessage() {
    this.setState({
      ...this.state,
      monkeyMessage: I18n.t(`pages.error.something_interesting.${this.props.code}`)
    })
  }

  render() {
    return (
      <div className='err' onClick={this.changeMessage}>
        <NavLink exact to='/' className='err__go-back'>
          Go to homepage
        </NavLink>
        <div className='err__code'>{this.state.errCode}</div>
        <div className='err__message'>{this.state.errMessage}</div>
        <div className='err__monkey'>
          <div className='err__monkey-text-wrapper'>
            <div className='err__monkey-text'>
              {this.state.monkeyMessage}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
