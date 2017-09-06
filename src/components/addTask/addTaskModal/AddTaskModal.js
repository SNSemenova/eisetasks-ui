import React, { Component } from 'react';
import Modal from 'react-modal';
import Textarea from 'react-textarea-autosize';
import { I18n } from 'react-redux-i18n';
import { newTask, updateTask } from '../action';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import './style.css';

const customStyles = {
  overlay : {
    backgroundColor: 'rgba(255, 255, 255, 0.75)'
  },
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : '10%',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    maxWidth             :  '1100px'
  }
};

class AddTaskModal extends Component {

  static contextTypes = {
    router: PropTypes.object,
  };
  constructor() {
    super();

    this.state = {
      modalIsOpen: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      Target: '',
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.state = {
      Target: this.props.task.taskName
    };
    if ('edit' === this.props.modalType) {
      this.props.has(true);
    }
    this.setState({modalIsOpen: true});
  }

  closeModal(event) {
    if ('edit' === this.props.modalType) {
      this.props.has(false);
    }
    this.state = {
      Target: ''
    };
    this.setState({modalIsOpen: false});
  }

  handleChange(event) {
    this.setState({
      Target: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    if ('edit' === this.props.modalType) {
      this.props.has(false);
    }
    if (this.props.modalType === 'add') {
      this.props.newTask(this.state.Target);
      this.context.router.history.push('/inbox');
    }
    if (this.props.modalType === 'edit') {
      this.props.updateTask(this.state.Target, this.props.task, this.props.taskType);
    }
    this.setState({
      Target: '',
      modalIsOpen: false
    });
  }

  static submitStyle() {
    return 'form__submit-button';
  }

  disable () {
    return this.state.Target === '' || (/^\s+$/.test(this.state.Target));
  }

  render() {
    let style = '';
    let topicText = '';
    let mark = '';
    if(this.props.modalType === 'add') {
      style = 'addTask';
      mark = 'marker';
      topicText = I18n.t('components.addTask.AddTaskTopic');
    }
    if (this.props.modalType === 'edit') {
      style = 'editTask';
      mark = 'marker-edit';
      topicText = I18n.t('components.addTask.EditTaskTopic');
    }
    if (this.props.marking) {
      style = 'no-display';
    }
    return (
      <div className='modal__block'>
        <div className={mark}>
          <div className={style} onClick={this.openModal}/>
        </div>
        <div className='modal'>
          <Modal
            isOpen={this.state.modalIsOpen}
            onAfterOpen={this.afterOpenModal}
            onRequestClose={this.closeModal}
            style={customStyles}
            contentLabel='Modal'
          >
            <div
              className='modal__topic-text'
              ref={subtitle => this.subtitle = subtitle}
            >
              {topicText}
            </div>
            <form
              className='form'
              onSubmit={this.handleSubmit}
              onChange={this.handleChange.bind(this)}>
          <Textarea
            className='textarea'
            type='text'
            placeholder={I18n.t('components.addTask.fieldPlaceholder')}
            value={this.state.Target}
            onChange={this.handleChange.bind(this)}
            autoFocus={true}
          />
              <div/>
              <input
                className={AddTaskModal.submitStyle()}
                type='submit'
                value={I18n.t('components.addTask.submit')}
                disabled={this.disable()}
              />
              <input
                className='modal__button'
                onClick={this.closeModal}
                value={I18n.t('components.addTask.cancel')}
                type='button'
              />
            </form>
          </Modal>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    marking: state.criteriaReducer.marking
  }
};

const mapDispatchToProps = (dispatch) => ({
  newTask: bindActionCreators(newTask, dispatch),
  updateTask: bindActionCreators(updateTask, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddTaskModal);