import React, { Component } from 'react';
import Modal from 'react-modal';
import { getModal } from './action';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './style.css';
import { setWindow } from '../action/action';

const customStyles = {
  overlay : {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
  content : {
    top                   : 'calc(35% + 15vh)',
    left                  : '50%',
    right                 : '8vw',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    maxWidth              :  '1100px',
    border                : 'none',
    background            : 'none'
  }
};

class OnlyTextModal extends Component {

  componentDidMount() {

  }

  constructor() {
    super();

    this.state = {
      modalIsOpen: true
    };

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal(e) {
    this.setState({modalIsOpen: true});
  }

  afterOpenModal() {
  }

  closeModal() {
    this.props.setWindow(null);
    this.setState({modalIsOpen: false});
    this.props.getOpenModal(false);
  }

  render() {
    return (
      <div>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Modal"
        >
        <div className="only-text-modal__container">
          <div className="only-text-modal__topic-text">
            {this.props.text1}
            <br />
            <span className="only-text-modal__email"> {this.props.email} </span>
            {this.props.email ? <br />: null}
            {this.props.text2}
          </div>
          <div className="only-text-modal__button-close"
            onClick={this.closeModal}> ok </div>
        </div>
        </Modal>
      </div>
    );
  }
}

OnlyTextModal.propTypes = {
  email: React.PropTypes.string,
  text1: React.PropTypes.string,
  text2: React.PropTypes.string,
  text3: React.PropTypes.string
};

const mapStateToProps = (state) => {
  return {
    window: state.modalWindowReducer.data
  }
};

const mapDispatchToProps = (dispatch) => ({
  getOpenModal: bindActionCreators(getModal, dispatch),
  setWindow: bindActionCreators(setWindow, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(OnlyTextModal);
