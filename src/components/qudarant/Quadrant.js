import React, {Component} from 'react';
import InformationAboutTasks from '../informationAboutTasks/InformationAboutTasks';
import InfiniteScroll from '../infiniteScroll/InfiniteScroll';
import Task from '../task/Task';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {getLengthTasks, getTasks} from '../../pages/toDo/action';

class Quadrant extends Component {

  constructor(props) {
    super(props);
    this.renderTaskList = this.renderTaskList.bind(this);
    this.hasNext = this.hasNext.bind(this);
  }

  componentDidMount() {
    this.props.getTasksAmount(this.props.type);
    this.props.getTasks(this.props.type, 1);
  }

  hasNext(){
    return (this.props.taskList !== undefined && this.props.taskList.length < this.props.tasksAmount)
  }

  renderTaskList(tasks){
    if (undefined !== this.props.tasks) {
      return (
        this.props.tasks.map((elem) =>{
          return(
            <Task key={`task-today-${elem.id}`} task={elem} type={1}/>
          )
        })
      )
    }
  }

  onScroll() {
    this.props.getTasks(this.props.type);
  }

  render() {
    return (
      <div className='quadrant'>
        <InformationAboutTasks length={this.props.tasksAmount}
                               blockName={this.props.name}
                               name='task'
                               type={this.props.type}>
        </InformationAboutTasks>
        <InfiniteScroll onScroll={this.onScroll}
                        hasNext={this.hasNext()}
                        className='quadrant__scroll-box'>
          <div className='block__tasks'>
            {this.renderTaskList(this.props.taskList)}
          </div>
        </InfiniteScroll>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {

  let tasksAmountStore = {
    true: {
      true: state.todoReducer.uiTasksLength,
      false: state.todoReducer.uniTasksLength
    },
    false: {
      true: state.todoReducer.nuiTasksLength,
      false: state.todoReducer.nuniTasksLength
    }
  };

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
    tasksAmount: tasksAmountStore[ownProps.type.urgent][ownProps.type.important],
    tasks: tasksStore[ownProps.type.urgent][ownProps.type.important]
  }
};

const mapDispatchToProps = (dispatch) => ({
  getTasksAmount: bindActionCreators(getLengthTasks, dispatch),
  getTasks: bindActionCreators(getTasks, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Quadrant);