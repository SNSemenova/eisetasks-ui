import React, { Component } from 'react';
import { I18n } from 'react-redux-i18n';
import PropTypes from 'prop-types';
import validator from 'validator';
import { sendEmail } from './action';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getModal } from '../../components/modalWindow/onlyTextModal/action';
import ModalWindow from '../../components/modalWindow/ModalWindow';
import '../../pages/signIn/signInForm/style.css';
import './style.css';

class ForgotPassword extends Component {

  static contextTypes = {
    router: PropTypes.object,
  };

  constructor() {

    super();

    this.state = {
      email: '',
      error: false
    };
  }

  formSubmit(event) {
    this.props.sendEmail(this.state.email);
    this.props.openModal('sent_email')
    event.preventDefault();
  }

  emailChange(event) {
    if (!validator.isEmail(event.target.value)) 
      this.setState({ 
        email: event.target.value,
        error: true
      });
    else 
      this.setState({ 
        email: event.target.value,
        error: false
      });
  }

  inputClass() {
    if (this.state.error === true)
      return 'email-form__input wrong' 
    else
      return 'email-form__input'
  }

  disableSubmit() {
    if (this.state.email.length === 0)
      return true
    return this.state.error
  }

  addLabel() {
    if (this.state.email.length > 0) 
      return 'email-form__label-email'
    else return 'email-form__label-email label-email_no-visible'
  }

  redirect() {
    this.context.router.history.push('/sign-in');
  }

  render() {
    return (
      <div> 
        <ModalWindow email={this.state.email}/>
        <div className='back' onClick={this.redirect.bind(this)}/>
        <div className='question_forgot'>
          {I18n.t('components.form.question.forgot')} <br/>
          {I18n.t('components.form.question.tell')}
        </div>
        <form onSubmit={this.formSubmit.bind(this)} className='email-form'>
          <div className={this.addLabel()}> E-mail </div>
          <input type='text' value={this.state.email} onChange={this.emailChange.bind(this)} 
            placeholder={I18n.t('components.form.email')} className={this.inputClass()}/>
          <input type='submit' className='form__submit' value={I18n.t('components.form.submit.help')} disabled={this.disableSubmit()}/>
        </form>
        <div className='monkey'/>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  sendEmail: bindActionCreators(sendEmail, dispatch),
  openModal: bindActionCreators(getModal, dispatch)
});

export default  connect(undefined, mapDispatchToProps)(ForgotPassword);