import React, { Component } from 'react';
import { signIn } from './action';
import { clearFlag } from '../../../components/inputField/action';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { I18n } from 'react-redux-i18n';
import PropTypes from 'prop-types';
import ModalWindow from '../../../components/modalWindow/ModalWindow';
import { getModal } from '../../../components/modalWindow/onlyTextModal/action';
import './style.css';
import InputField from '../../../components/inputField/InputField';
import {NavLink} from 'react-router-dom';


class SignInForm extends Component {

  componentDidMount() {
    this.props.getOpenModal(false);
    this.props.clearFlag();
  }

  constructor() {

    super();

    this.state = {
      email: '',
      password: '',
      error: '',
      wrong: '',
      type: 'password',
      checkbox: false,
      message: ''
    };
  }

  static contextTypes = {
    router: PropTypes.object,
  };

  emailChange(event) {  
  this.setState({
      email: event.target.value
    });    
  }

  passwordChange(event) {
    this.setState({
      password: event.target.value
    });
  }

  formSubmit(event) {  
    this.props.signIn(this.state.email, this.state.password); 
    event.preventDefault();

  }

  redirect() {
    if (this.props.flag) {
      this.context.router.history.push('/')
    }
  }

  errorMessage() {   
    if (this.props.flag === false) {
      return (        
        <div className='auth-error error' />
      )
    }
  }

  inputClass(name) {
    if (this.props.flag === false)
      return 'form__input wrong' 
    return 'form__input'
  }

  addLabel(name) {
    if (name === 'label-email')
      if (this.state.email.length > 0) 
        return name
      else return 'label-email label-hidden'
    if (name === 'label-password')
      if (this.state.password.length > 0) 
        return name
      else return 'label-password label-hidden'
  }



  showHide() {
    this.setState({
      type: this.state.type === 'input' ? 'password' : 'input'
    }) 
  }

  disableSubmit() {
    return (this.state.email.length === 0 || this.state.password.length === 0)
  }

  handleSubmit(event) {
    event.preventDefault();
    this.context.router.history.push('/sign-up')
  }

  render() {
    this.redirect();
    return (
      <div>
        <ModalWindow email={this.state.email}/>  
        <form onSubmit={this.formSubmit.bind(this)} className='form-user'>
          <InputField className={this.inputClass('email')}
                      labelClassName={this.addLabel('label-email')}
                      label={'E-mail'}
                      value={this.state.email} onChange={this.emailChange.bind(this)}
                      placeholder={I18n.t('components.form.email')}
          />
          <InputField className={this.inputClass('password')}
                      labelClassName={this.addLabel('label-password')}
                      label={'Password'}
                      value={this.state.password} onChange={this.passwordChange.bind(this)}
                      placeholder={I18n.t('components.form.password')}
                      changableVisibility={true}
          />
          <NavLink className='forgot' to={'/forgot-password'}>
            {I18n.t('components.form.forgot')}
          </NavLink>
          <input type='submit' className='form__submit' value={I18n.t('components.form.submit.login')} disabled={this.disableSubmit()}/>           
          <div className='question'> {I18n.t('pages.signin.question')} </div>
          <NavLink className='link' to={'/sign-up'}>
            {I18n.t('pages.signin.link')}
          </NavLink>
        </form>
        {this.errorMessage()}
        <div className='monkey' />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
      flag: state.tokenReducer.flag,
      openModal: state.openModalReducer.openModal,
      message: state.tokenReducer.data.message
  }
};

const mapDispatchToProps = (dispatch) => ({
  signIn: bindActionCreators(signIn, dispatch),
  getOpenModal: bindActionCreators(getModal, dispatch),
  clearFlag: bindActionCreators(clearFlag, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(SignInForm);