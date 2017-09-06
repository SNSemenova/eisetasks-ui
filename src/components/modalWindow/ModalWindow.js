import React, { Component } from 'react';
import { connect } from 'react-redux';
import Timer from '../../components/timer/Timer';
import OnlyTextModal from '../modalWindow/onlyTextModal/OnlyTextModal';


class ModalWindow extends Component {

  render() {
    if (this.props.openModal === "registration")
      return (
        <div>
          <OnlyTextModal
            text1={"We sent you a message to"}
            email={this.props.email}
            text2={"follow the instructions there to confirm your address."}
            />
        </div>
      );
    if (this.props.openModal === "recovering")
      return (
        <div>
          <OnlyTextModal
            text1={"Thank you!"}
            text2={"Your password is recovered. Now you can log in"}
            />
        </div>
      );
    if (this.props.openModal === "registered")
      return (
        <div>
          <Timer  
            start={Date.now()}  
            timeStart={15}    
          />
          <OnlyTextModal
            text1={"Thank you!"}
            text2={"Your account is registered. You'll be redirected to the login page."}
            />
        </div>
      );
    if (this.props.openModal === "sent_email")
      return (
        <div>
          <OnlyTextModal
            text1={"We sent you a message to"}
            email={this.props.email}
            text2={"Please, follow the instructions there \n to recover your password."}
            />
        </div>
      );
    return null;
  }
}

const mapStateToProps = (state) => {
  return {
      openModal: state.openModalReducer.openModal
  }
};

export default connect(mapStateToProps, undefined)(ModalWindow);