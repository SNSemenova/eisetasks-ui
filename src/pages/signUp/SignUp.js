import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cookie from 'react-cookies';
import Form from './signUpForm/SignUpForm';
import FormLayout from '../../components/formLayout/FormLayout';
import './style.css';


class SignUp extends Component {

  static contextTypes = {
    router: PropTypes.object,
  };
  
  componentDidMount() {
    let token =  cookie.load("sessionID");
    if (token) 
      this.context.router.history.push('/');
  }

  render() {
    return (
      <div> 
        <FormLayout>   
          <Form name="registration"/>
        </FormLayout>
      </div>
    );
  }
}

export default SignUp;