import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getDoneData } from './action';
import { I18n } from 'react-redux-i18n';
import  InfiniteScroll from  '../../components/infiniteScroll/InfiniteScroll';
import PropTypes from 'prop-types';
import Task from '../../components/task/Task';
import PageLayout from '../../components/pageLayout/PageLayout';
import './style.css';

class DoneTasks extends Component {

  timestamp;

  static contextTypes = {
    router: PropTypes.object,
  };

  componentDidMount() {  
      this.props.getAppData(7, 1, false);
  }

  renderTasks() {
    this.timestamp = null;
    if (undefined !== this.props.data && this.props.data.length > 0) {
      return (
        this.props.data.map((elem, index)=> {
          return (
            <div key={`task-done-${index}`}>
              {this.parseTimestamp(elem.timestamp)}
              <Task task={elem} type={4}/>
            </div>
          );
        })
      )
    } else {
      return (
        <div className='message'>
          {I18n.t('pages.message.done.first')} <br/>
          {I18n.t('pages.message.done.second')} <br/>
          {I18n.t('pages.message.done.third')} <br/>
        </div>
      );
    }
  }

  parseTimestamp(timestamp) {
    let timestampObject = <div className='timestamp' hidden={this.timestamp === timestamp}>{timestamp}</div>;
    this.timestamp = timestamp;
    return timestampObject;
  }

  redirect() {
    if (this.props.message === 'token error')
      this.context.router.history.push('/sign-in');
  }

  render() {
    return (
      <PageLayout>
        <InfiniteScroll onScroll={this.props.getAppData} hasNext={this.props.hasNext}>
          <div className='done-tasks'>
            {this.renderTasks()}
          </div>
        </InfiniteScroll>
      </PageLayout>
    );
  }
}
 

const mapStateToProps = (state) => {
  return {
      data: state.appCompReducerDone.data,
      hasNext: state.appCompReducerDone.hasNext,
      message: state.appCompReducerDone.message
  }
};

const mapDispatchToProps = (dispatch) => ({
  getAppData: bindActionCreators(getDoneData, dispatch)  
});

// export default withCookies(connect(mapStateToProps, mapDispatchToProps)(DoneTasks)); 
export default connect(mapStateToProps, mapDispatchToProps)(DoneTasks); 
