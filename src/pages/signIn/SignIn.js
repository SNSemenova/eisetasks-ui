import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import cookie from 'react-cookies';
import Form from './signInForm/SignInForm';
import FormLayout from '../../components/formLayout/FormLayout';
import { getModal } from '../../components/modalWindow/onlyTextModal/action';
import ModalWindow from '../../components/modalWindow/ModalWindow';
import './style.css';

class SignIn extends Component {

  static contextTypes = {
    router: PropTypes.object,
  };

  componentDidMount() {    
    this.props.openModal(false);
    let token =  cookie.load("sessionID");
    if (token !== undefined)
      this.context.router.history.push('/');
    else {
      if (this.props.window === "recovered")
        this.props.openModal("recovering")
      if (this.props.window === "registered")
        this.props.openModal("registered")
    }
  }

  render() {
    return (
      <div>
        <ModalWindow/> 
        <FormLayout>   
          <Form name="authorization"/>          
        </FormLayout>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {    
    window: state.modalWindowReducer.data
  }
};

const mapDispatchToProps = (dispatch) => ({
  openModal: bindActionCreators(getModal, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);