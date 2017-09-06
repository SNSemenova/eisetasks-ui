import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setNewPassword } from './action';
import { setWindow } from '../../components/modalWindow/action/action';
import PropTypes from 'prop-types';
import { I18n } from 'react-redux-i18n';
import '../../pages/signIn/signInForm/style.css';
import './style.css';

class RecoverPassword extends Component {

  static contextTypes = {
    router: PropTypes.object,
  };

  constructor() {
    super();
    this.state = {
      password: '',
      type: 'password'
    };
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.props.location.search.slice(1) !== undefined) this.props.setNewPassword(this.props.location.search.slice(1), this.state.password);
    this.props.setWindow('recovered');
    this.context.router.history.push('/sign-in');
  }

  addLabel() {
    if (this.state.password.length > 0) 
      return 'password-form__label-password'
    else return 'password-form__label-password label-password_no-visible'
  }

  passwordChange(event) {
    if (event.target.value.length < 8 || event.target.value.length > 100) 
      this.setState({ 
        password: event.target.value,
        error: true
      });
    else 
      this.setState({ 
        password: event.target.value,
        error: false
      });
  }

  inputClass() {
    if (this.state.error === true)
      return 'password-form__input wrong' 
    else
      return 'password-form__input'
  }

  disableSubmit() {
    if (this.state.password.length === 0)
      return true
    return this.state.error
  }

  redirect() {
    this.context.router.history.push('/forgot-password');
  }

  eyeClass() {
    if (this.state.type === 'password')
      if (this.state.password.length > 0)
        return 'password-eye password-eye_typed'
      else return 'password-eye'
    else 
      return 'password-eye password-eye_active'
  }

  showHide() {
    this.setState({
      type: this.state.type === 'input' ? 'password' : 'input'
    }) 
  }

  render() {
    return (
      <div>
        <div className='back' onClick={this.redirect.bind(this)}/>
        <div className='question_forgot'>
          {I18n.t('components.form.changePassword')} 
        </div>
        <form onSubmit={this.handleSubmit.bind(this)} className='password-form'>
          <div className={this.addLabel()}> {I18n.t('components.form.newPassword')} </div>
          <input type={this.state.type} value={this.state.password} onChange={this.passwordChange.bind(this)} 
            placeholder={I18n.t('components.form.newPassword')} className={this.inputClass()}/>
          <div className={this.eyeClass()} onClick={this.showHide.bind(this)} />
          <input type='submit' className='form__submit' value={I18n.t('components.form.submit.setNew')} disabled={this.disableSubmit()}/>
        </form> 
        <div className='monkey'/>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  setNewPassword: bindActionCreators(setNewPassword, dispatch),
  setWindow: bindActionCreators(setWindow, dispatch)
});

export default connect(undefined, mapDispatchToProps)(RecoverPassword);