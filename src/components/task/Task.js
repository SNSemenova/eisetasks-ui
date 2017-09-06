import React, { Component } from 'react';
import './style.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { moveTask, checkTask, markTask, copyTask } from './action';
import AddTaskModal from '../addTask/addTaskModal/AddTaskModal';

let flag = false;
class Task extends Component {

  componentWillUnmount() {
    this.props.checkTask(null);
  }

  clickDone(event) {
    event.stopPropagation();
    this.props.moveTask(this.props.task, {collection: this.props.type, collectionTo: 4});
  }

  clickPostpone(event) {
    event.stopPropagation();
    this.props.moveTask(this.props.task, {collection: this.props.type, collectionTo: 3});
  }

  toInbox(event) {
    event.stopPropagation();
    this.props.moveTask(this.props.task, {collection: this.props.type, collectionTo: 2});
  }

  clickDelete(event) {
    event.stopPropagation();
    this.props.moveTask(this.props.task, {collection: this.props.type, collectionTo: 5});
  }

  clickCopy(event) {
    event.stopPropagation();
    this.props.copyTask(this.props.task.id);
  }

  flags(f) {
    flag = f;
  }

  onClick(){
    if (this.props.criteria.marking && this.props.type===2) {
      this.props.markTask(this.props.task.id, this.props.criteria.name)
    }
    else
      if (!flag) {
        if (this.props.checked === this.props.task.id)
          this.props.checkTask(false);
        else
          this.props.checkTask(this.props.task.id);
      } 
  }

  setButtons() {
    if (this.props.checked === this.props.task.id) {
      if (this.props.type===3)
        return(
          <div className='buttons'>
            <button type='button' className='button-move' onClick={this.toInbox.bind(this)}/>
            <button type='button' className='button-delete' onClick={this.clickDelete.bind(this)}/>
          </div>
        )
      if (this.props.type===1 || (this.props.type===2 && !this.props.criteria.marking))
        return(
          <div className='buttons'>
            <button type='button' className='button-delete' onClick={this.clickDelete.bind(this)}/>
            <button type='button' className='button-postpone' onClick={this.clickPostpone.bind(this)}/>
          </div>
        )
      if (this.props.type===4)
        return(
          <button type='button' className='button-copy' onClick={this.clickCopy.bind(this)}/>
        )  
    } 
  }

  rectangleClass() {
    let checked = Object.keys(this.props.markedTask);
    let id = this.props.task.id;
    let newClass = 'rectangle';
    checked.map((elem) => {
      if (id === elem && this.props.markedTask[elem][this.props.criteria.name] === true) {
        newClass = 'checked-rect'
      }
      return newClass;
    });
    return newClass    
  }

  setButton() {
    if (this.props.type===2 && this.props.criteria.marking) {
      return (
        <div className={this.rectangleClass()}/>
      );
    }
    if (this.props.checked === this.props.task.id && this.props.type !== 4) {
        return (
          <AddTaskModal modalType={'edit'}
                        taskType={this.props.type}
                        has={this.flags}
                        task={this.props.task}
          />
        )
      }

    let buttonClassName = 'left-button';
    let onClickEventHandler;

    if (this.props.type===4) {
      buttonClassName += ' tick';
      onClickEventHandler = this.toInbox.bind(this);
    } else {
      buttonClassName += ' circle';
      onClickEventHandler = this.clickDone.bind(this);
    }

    return (
      <button type='button' className={buttonClassName} onClick={onClickEventHandler}/>
    );
  }

  chooseClass() {
    return('task')
  }

  chooseClassTaskName() {
    let className = 'task-name';
    if (this.props.checked === this.props.task.id) {
      className += ' task-name-opened'
    }
    return className;
  }

  setLabelClass(type, criterion) {
    let clicked = this.props.criteria.clicked;
    let markedTask = this.props.markedTask;
    let checked = Object.keys(markedTask);
    let id = this.props.task.id;
    let newClass = 'no-visible';
    Object.keys(clicked).forEach(
      function (item, index, array) {
        if (criterion === item)
          newClass = `label-${type}`;
      }
    );
    checked.forEach(
      function (item, index, array) {
        if (id === item && markedTask[item][criterion] === true) {
          newClass = `checked-${type}`
        }
      }
    );
    return newClass;
  }

  setLabels() {
    if (this.props.criteria.clicked)
      if (Object.keys(this.props.criteria.clicked).length > 0 && this.props.type===2)
        return(
          <div className='labels'>
            <div className={this.setLabelClass('i', 'Important')}/>
            <div className={this.setLabelClass('u', 'Urgent')}/>
            <div className={this.setLabelClass('c', 'Clear')}/>
          </div>
        )
  }

  render() {
    return (
      <div className={'task'} onClick={this.onClick.bind(this)} name={this.props.task.taskName}>
        {this.setButton()}
        {this.setButtons()}
        <div className={this.chooseClassTaskName()}>
          {this.props.task.taskName}
        </div>
        {this.setLabels()}
      </div>
      );
  }
}

const mapStateToProps = (state) => {
  return {
    checked: state.checkTaskReducer.checked,    
    filters: state.filtersReducer,
    criteria: state.criteriaReducer,
    markedTask: state.markingReducer
  }
};

const mapDispatchToProps = (dispatch) => ({
  moveTask: bindActionCreators(moveTask, dispatch),
  checkTask: bindActionCreators(checkTask, dispatch),
  markTask: bindActionCreators(markTask, dispatch),
  copyTask: bindActionCreators(copyTask, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Task);