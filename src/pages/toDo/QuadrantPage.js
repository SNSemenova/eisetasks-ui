import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { I18n } from 'react-redux-i18n';
import {getTasks, setPageQuandrant} from './action';
import cookie from 'react-cookies';
import PageLayout from '../../components/pageLayout/PageLayout';
import InfiniteScroll from '../../components/infiniteScroll/InfiniteScroll';
import BottomArrow from '../../components/bottomArrow/BottomArrow';
import BottomButton from '../../components/bottomButton/BottomButton';
import Task from '../../components/task/Task';
import AddTaskModal from '../../components/addTask/addTaskModal/AddTaskModal';
import './style.css';


class QuadrantPage extends Component {

  titleTextMap = {
    true: {
      true: 'Do',
      false: 'Delegate'
    },
    false: {
      true: 'Plan',
      false: 'Drop'
    }
  };

  componentDidMount() {
    this.getData = this.getData.bind(this);
    this.renderTitle = this.renderTitle.bind(this);
    let token = cookie.load('sessionID');
    if (!token)
      this.context.router.history.push('/sign-in');
    else {
      this.props.setPage(window.location.href);
      this.props.getTasks(this.props.type, 1);
    }
  }

  getData(pageSize, pageNumber){
    this.props.getTasks(this.props.type, pageNumber);
  }

  renderTitle(type) {
    return (
      <div className='wrapper__title'>
        <div className={`image__important-${type.important}`}/>
        <div className={`image__urgent-${type.urgent}`}/>
        <div className='title-text'>{this.titleTextMap[type.urgent][type.important]}</div>
      </div>
    );
  }

  renderTasks(){
    if (this.props.tasks !== undefined && this.props.tasks.length > 0) {
      return(
        this.props.tasks.map((elem)=>{
          return (
            <Task key={`task-today-${elem.id}`} task={elem} type={1}/>
          )
        })
      )
    } else {
      return (
        <div className='message'>
          {I18n.t('pages.message.no_tasks')}<br/>
        </div>
      )
    }
  }

  render() {
    return (
      <PageLayout>
        {this.renderTitle(this.props.type)}
        <InfiniteScroll onScroll={this.getData} className='scroll__area_todo'>
          {this.renderTasks()}
        </InfiniteScroll>
        <AddTaskModal modalType={'add'} has={null} task={{taskName: ''}}/>
        <BottomArrow arrowSide={'left'} quadrandType={this.props.type}/>
        <BottomArrow arrowSide={'right'} quadrandType={this.props.type}/>
        <BottomButton type={this.props.type}/>
      </PageLayout>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  let tasksStore = {
    true: {
      true: state.todoReducer.uiTasks,
      false: state.todoReducer.uniTasks
    },
    false: {
      true: state.todoReducer.nuiTasks,
      false: state.todoReducer.nuniTasks
    }
  };
  return {
    tasks: tasksStore[ownProps.type.urgent][ownProps.type.important]
  }
};

const mapDispatchToProps = (dispatch) => ({
  getTasks: bindActionCreators(getTasks, dispatch),
  setPage: bindActionCreators(setPageQuandrant, dispatch)
});


export default connect(mapStateToProps, mapDispatchToProps)(QuadrantPage);
