import React, { Component } from 'react';
import Modal from 'react-modal';
import './style.css';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {getLengthTasks} from '../../../pages/toDo/action';
import { bindActionCreators } from 'redux';

const customStyles = {
  overlay : {
    backgroundColor: 'rgba(255, 255, 255, 0.75)',
  },
  content : {
    top                   : 'calc(115px + 20%)',
    left                  : '50%',
    right                 : '30%',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    maxWidth              :  '1100px',
    border                : 'none'
  }
};

class WarningModal extends Component {

  static propTypes = {
  };

  static contextTypes = {
    router: PropTypes.object,
  };
  constructor() {
    super();

    this.state = {
      modalIsOpen: true
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({modalIsOpen: true});
  }

  closeModal() {
    this.setState({modalIsOpen: false});
    this.props.getLengthTasks({"important": true, "urgent": true});
    this.props.getLengthTasks({"important": true, "urgent": false});
    this.props.getLengthTasks({"important": false, "urgent": true});
    this.props.getLengthTasks({"important": false, "urgent": false});
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
        <div className="modal-warning__topic-text">
          {this.props.messageText}
        </div>
        <div
          className="warning-modal__button-close"
          onClick={this.closeModal}
        />
      </Modal>
      </div>
    );
  }
}

WarningModal.propTypes = {
  messageText: React.PropTypes.string,
  type: React.PropTypes.string
};


const mapStateToProps = (state) => {
  return {
    uiTasksLength: state.todoReducer.uiTasksLength,
    uniTasksLength: state.todoReducer.uniTasksLength,
    nuiTasksLength: state.todoReducer.nuiTasksLength,
    nuniTasksLength: state.todoReducer.nuniTasksLength
  }
};

const mapDispatchToProps = (dispatch) => ({
  getLengthTasks: bindActionCreators(getLengthTasks, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(WarningModal);