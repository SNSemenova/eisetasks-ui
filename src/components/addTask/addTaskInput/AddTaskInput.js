import React, { Component } from 'react';
import './style.css';
import { I18n } from 'react-redux-i18n';
import { newTask } from '../action';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

class AddTaskInput extends Component {

  static contextTypes = {
    router: PropTypes.object,
  };

  constructor() {

    super();

    this.state = {
      task: ""
    };
  }

  handleChange(event) {
    this.setState({
      task: event.target.value
    });
  }

  handleSubmit(event) {
    this.props.newTask(this.state.task);
    event.preventDefault();
    this.context.router.history.push('/inbox');
    this.setState({
      task: ""
    });
  }

  disable () {
    return this.state.task === "" || (/^\s+$/.test(this.state.task));
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit.bind(this)} className="add-task__form">
        <input type="text" value={this.state.task} onChange={this.handleChange.bind(this)} 
        placeholder={I18n.t('components.form.add_task')} className="add-task__input" />
        <input type="submit" className="add-task__button" onClick={this.handleSubmit.bind(this)} disabled={this.disable()}
        value=""/>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  newTask: bindActionCreators(newTask, dispatch)
});

export default connect(undefined, mapDispatchToProps)(AddTaskInput);