import React, { Component } from 'react';
import { signUp } from './action';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { I18n } from 'react-redux-i18n';
import PropTypes from 'prop-types';
import validator from 'validator';
import ModalWindow from '../../../components/modalWindow/ModalWindow';
import { getModal } from '../../../components/modalWindow/onlyTextModal/action'
import './style.css';


class SignUpForm extends Component {

  constructor() {

    super();

    this.state = {
      email: "",
      password: "",
      error: "",
      wrong: "",
      type: "password",
      checkbox: false,
      message: ""
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
    this.props.signUp(this.state.email, this.state.password);
    this.props.getOpenModal("registration");
    event.preventDefault();
  }

  redirect() {
    if (this.props.flag) {
      this.context.router.history.push('/')
    }
  }

  errorMessage() { 
    if (this.state.error === "not-email") 
      return (
        <div className="email-error error" />
      )
    if (this.state.error === "long") 
      return (
        <div className="long-error error" />
      )
    if (this.state.error === "short") 
      return (
        <div className="short-error error" />
      )  
  }

  inputClass(name) {
    if (this.state.wrong === "email" && this.state.wrong === name)
      return "form__input wrong" 
    if (this.state.wrong === "password" && this.state.wrong === name)
      return "form__input password-wrong"
    return "form__input"
  }

  addLabel(name) {
    if (name === "label-email")
      if (this.state.email.length > 0) 
        return name
      else return "label-email label-hidden"
    if (name === "label-password")
      if (this.state.password.length > 0) 
        return name
      else return "label-password label-hidden"
  }

  eyeClass() {
    if (this.state.type === "password")
      if (this.state.password.length > 0)
        return "password-eye password-eye_typed";
      else return "password-eye";
    else 
      return "password-eye password-eye_active"
  }

  showHide() {
    this.setState({
      type: this.state.type === 'input' ? 'password' : 'input'
    }) 
  }

  changeCheckbox() {
    if (this.state.checkbox === true)
      this.setState({
        checkbox: false
      });
    else
      this.setState({
        checkbox: true
      });
  }

  checkboxClass() {
    if (this.state.checkbox === true)
      return "agree_checked"
    return "agree"
  }

  disableSubmit() {
    return ((!this.state.checkbox) || 
            this.state.wrong === "email" || this.state.wrong === "password" ||
            this.state.email.length === 0 || this.state.password.length === 0)
  }

  blurEmail() {
    if (this.state.wrong === "email")
      this.setState({
        error: "",
        wrong: ""
      }) 
    if (!validator.isEmail(this.state.email)) 
      this.setState({
        wrong: "email",
        error: "not-email"
      }); 
    else {     
      if (this.state.password.length >= 100) 
        this.setState({
          wrong: "password"
        })
      if (this.state.password.length < 8) 
        this.setState({
          wrong: "password"
        })
    }
  }

  blurPassword() { 
    if (this.state.wrong === "password") 
      this.setState({
        error: "",
        wrong: ""
      }) 
    if (this.state.password.length >= 100) 
      this.setState({
        error: "long",
        wrong: "password"
      })
    else
      if (this.state.password.length < 8) 
        this.setState({
          error: "short",
          wrong: "password"
        }) 
      else 
        if (!validator.isEmail(this.state.email)) 
            this.setState({
              wrong: "email"
            });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.context.router.history.push('/sign-in');
  }

  clickInput() {
    this.setState({
        error: ""
      })
  }

  render() {
    this.redirect();
    return (
      <div>
        <ModalWindow email={this.state.email}/>  
        <form onSubmit={this.formSubmit.bind(this)} className="form-user">
          <div className={this.addLabel("label-email")}> E-mail </div>
          <input type="text" value={this.state.email} onChange={this.emailChange.bind(this)} onClick={this.clickInput.bind(this)}
          placeholder={I18n.t('components.form.email')} className={this.inputClass("email")} onBlur={this.blurEmail.bind(this)}/>
          <div className={this.addLabel("label-password")}> Password </div>
          <input type={this.state.type} value={this.state.password} onChange={this.passwordChange.bind(this)} onClick={this.clickInput.bind(this)}
            placeholder={I18n.t('components.form.password')} className={this.inputClass("password")} onBlur={this.blurPassword.bind(this)}/>
          <div className={this.eyeClass()} onClick={this.showHide.bind(this)} />
          <label className="agree_lable">
            <div className={this.checkboxClass()} />
            <input type="checkbox" value="I agree to process my personal data" className="nothing" onChange={this.changeCheckbox.bind(this)}/>
            I agree to process my personal data
          </label>
          <input type="submit" className="form__submit" value={I18n.t('components.form.submit.signup')} disabled={this.disableSubmit()}/>           
          <div className="question"> {I18n.t('pages.signup.question')} </div>
          <div
            className="link"
            onClick={this.handleSubmit.bind(this)}>
            {I18n.t('pages.signup.link')}
          </div>
        </form>
        {this.errorMessage()}
        <div className="monkey" />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
      message: state.tokenReducer.data.message
  }
};

const mapDispatchToProps = (dispatch) => ({
  signUp: bindActionCreators(signUp, dispatch),  
  getOpenModal: bindActionCreators(getModal, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUpForm);