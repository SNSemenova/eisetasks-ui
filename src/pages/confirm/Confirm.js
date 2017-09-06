import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { confirmReg } from './action';
import { setWindow } from '../../components/modalWindow/action/action';

class Confirm extends Component {

  static contextTypes = {
    router: PropTypes.object,
  };

  constructor() {
    super();
    this.redirect = this.redirect.bind(this);
  }

  componentDidMount() {
    this.props.confirmReg(this.props.location.search.slice(1));
  }

  redirect() {
    let redirectionMap = {
      true: '/sign-in',
      false: window.location.href
    };
    this.context.router.history.push(redirectionMap[undefined === this.props.status]);
  }

  render() {
    {this.redirect()}
    return null
  }
}
const mapStateToProps = (state) => {
  return {
    status: state.confirmationOfRegistration.status
  }
};

const mapDispatchToProps = (dispatch) => ({
  confirmReg: bindActionCreators(confirmReg, dispatch),  
  setWindow: bindActionCreators(setWindow, dispatch)  
});

export default connect(mapStateToProps, mapDispatchToProps)(Confirm);