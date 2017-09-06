import React, { Component } from 'react';
import './style.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getInboxData } from './action';
import { I18n } from 'react-redux-i18n';
import  InfiniteScroll from  '../../components/infiniteScroll/InfiniteScroll';
import Criteria from '../../components/criteria/Criteria';
import PropTypes from 'prop-types';

import Task from '../../components/task/Task';
import PageLayout from '../../components/pageLayout/PageLayout';

class InboxTasks extends Component {

  static contextTypes = {
    router: PropTypes.object,
  };

  componentDidMount() {
    this.renderTasks = this.renderTasks.bind(this);
    this.props.getAppData(7, 1, false);
  }

  redirect() {
    if (this.props.message === 'token error')
      this.context.router.history.push('/sign-in');
  }

  renderTasks(){
    if (this.props.tasks.length > 0) {
      return (
        this.props.tasks.map((elem) => {
            return (
              <Task key={`task-today-${elem.id}`} task={elem} type={2}/>
            )
          }
        )
      )
    } else {
      return (
        <div className='message'>
          {I18n.t('pages.message.inbox.first')} <br/>
          {I18n.t('pages.message.inbox.second')} <br/>
        </div>
      )
    }
  }

  render() {
    return (
      <PageLayout>
        {this.redirect()}
        <Criteria />
        <InfiniteScroll onScroll={this.props.getAppData} hasNext={this.props.hasNext} className='scroll__area_inbox'>
          {this.renderTasks()}
        </InfiniteScroll>
      </PageLayout>
    );
  }
}


const mapStateToProps = (state) => {
  return {
      tasks: state.appCompReducerInbox.data,
      hasNext: state.appCompReducerInbox.hasNext,
      message: state.appCompReducerInbox.message
  }
};

const mapDispatchToProps = (dispatch) => ({
  getAppData: bindActionCreators(getInboxData, dispatch)  
});

export default connect(mapStateToProps, mapDispatchToProps)(InboxTasks);

