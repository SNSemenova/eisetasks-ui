import React, { Component } from 'react';
import { slide as Menu } from 'react-burger-menu';
import './style.css';
import logo from "../../../public/logo.png";
import cookie from 'react-cookies';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { signOut, deleteToken } from './action';
import PropTypes from 'prop-types';

class Burger extends Component {
  
  static contextTypes = {
    router: PropTypes.object,
  };

  constructor() {
    super();
    this.state = {
      burgerIsOpen: false
    };
    this.closeBurger = this.closeBurger.bind(this);
    this.openBurger = this.openBurger.bind(this);
    this.logOut = this.logOut.bind(this);
  }

  closeBurger(event) {
    this.setState({burgerIsOpen: false});
  }

  openBurger(e) {
    this.setState({burgerIsOpen: true});
  }

  logOut() {
    this.setState({burgerIsOpen: false});
    this.props.signOut(cookie.load("sessionID"));
    cookie.remove("sessionID", { path: "/" });
    this.props.deleteToken();
    this.context.router.history.push('/sign-in')
  }

  render() {
    return (
      <div>
        <Menu id={ "sidebar" } isOpen={this.state.burgerIsOpen}>
          <div className="burger-menu__header">
            <div className="burger-menu__wrapper">
              <div className="burger-menu__close" onClick={this.closeBurger}/>
                  <img src={logo} alt="You" className="burger-menu__log"/>
                  <div className="burger-menu__wrapper_block-welcome-text">
                    <div className="burger-menu__block-welcome-text">
                      Hello, Johny. Have a good day!
                    </div>
                </div>
            </div>
          </div>
          <div className="burger-menu__wrapper-content">
            <div className="burger-menu__wrapper-content-intern">
              <div className="burger-menu__wrapper-icon burger-menu__wrapper-icon_profile"/>
                <div className="burger-menu-wrapper-text">My profile</div>
                <br />
            </div>
            <div className="burger-menu__wrapper-content-intern">
              <div className="burger-menu__wrapper-icon burger-menu__wrapper-icon_help"/>
                <div className="burger-menu-wrapper-text">Help</div>
                <br />
            </div>
            <div className="burger-menu__wrapper-content-intern">
              <div className="hr"/>
              <div
                className="burger-menu__wrapper-content-intern"
                onClick={this.logOut.bind(this)}
              />
              <div className="burger-menu__wrapper-icon burger-menu__wrapper-icon_logout"/>
                <div
                  className="burger-menu-wrapper-text"
                  onClick={this.logOut.bind(this)}
                >
                  Log out
                </div>
                <br />
            </div>
          </div>
          <div className="burger-menu__footer"/>
        </Menu>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  signOut: bindActionCreators(signOut, dispatch),
  deleteToken: bindActionCreators(deleteToken, dispatch)
});

export default connect(null, mapDispatchToProps)(Burger);