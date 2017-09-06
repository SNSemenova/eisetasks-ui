import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { signOut, deleteToken } from '../burger/action';
import cookie from 'react-cookies';
import PropTypes from 'prop-types';
import './style.css';

class LogoutButton extends Component {

  static contextTypes = {
    router: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this)
  }

  logout() {
    this.props.signOut(cookie.load('sessionID'));
    cookie.remove('sessionID', { path: '/' });
    this.props.deleteToken();
    this.context.router.history.push('/sign-in')
  }

  render() {
    return (
      <div className='logout' onClick={this.logout} >
        <div className='logout__text'>Log out</div>
        <div className='logout__pic'/>
      </div>
    );
  }
}
 
const mapDispatchToProps = (dispatch) => ({
  signOut: bindActionCreators(signOut, dispatch),
  deleteToken: bindActionCreators(deleteToken, dispatch)  
});

export default connect(undefined, mapDispatchToProps)(LogoutButton);
