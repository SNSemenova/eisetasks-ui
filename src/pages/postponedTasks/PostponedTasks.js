import React, { Component } from 'react';
import './style.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getPostponedData } from './action';
import { I18n } from 'react-redux-i18n';
import Task from '../../components/task/Task';
import InfiniteScroll from  '../../components/infiniteScroll/InfiniteScroll';
import cookie from 'react-cookies';
import PropTypes from 'prop-types';
import PageLayout from '../../components/pageLayout/PageLayout';

class PostponedTasks extends Component {

  static contextTypes = {
    router: PropTypes.object,
  };

  componentWillMount() {
    this.state =  { token: cookie.load('sessionID') }
  }

  componentDidMount() {
    this.props.getAppData(7, 1, false);
  }

  redirect() {
    if (this.props.message === 'token error')
      this.context.router.history.push('/sign-in');
  }

  renderTasks() {
    if (this.props.data.length > 0) {
      return (
        this.props.data.map((elem) => (
          <Task key={`task-today-${elem.id}`} task={elem} type={3}/>
        )
      ))
    } else {
      return (
        <div className='message'>
          {I18n.t('pages.message.postponed.first')} <br/>
          {I18n.t('pages.message.postponed.second')} <br/>
          {I18n.t('pages.message.postponed.third')} <br/>
        </div>
      )
    }
  }

  render() {
    return (
      <PageLayout>
        <InfiniteScroll onScroll={this.props.getAppData} hasNext={this.props.hasNext}>
          <div className='postponed-tasks'>
            {this.renderTasks()}
          </div>
        </InfiniteScroll>
        {this.redirect()}
      </PageLayout>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    data: state.appCompReducerPostponed.data,
    hasNext: state.appCompReducerPostponed.hasNext,
    message: state.appCompReducerPostponed.message
  }
};

const mapDispatchToProps = (dispatch) => ({
  getAppData: bindActionCreators(getPostponedData, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(PostponedTasks);
