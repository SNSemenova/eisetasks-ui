import React, { Component } from 'react';
import BottomButton from '../../components/bottomButton/BottomButton';
import cookie from 'react-cookies';
import PropTypes from 'prop-types';
import PageLayout from '../../components/pageLayout/PageLayout';
import Quadrant from '../../components/qudarant/Quadrant';
import './style.css';

export default class ToDo extends Component {

  static contextTypes = {
    router: PropTypes.object,
  };

  componentWillMount() {
    this.state =  { token: cookie.load('sessionID') };
    this.renderTasksTable = this.renderTasksTable.bind(this);
  }

  componentDidMount() {
    if (!this.state.token) 
      this.context.router.history.push('/sign-in');
  }

  renderTasksTable() {
    return(
      <div className='block_content'>
        <Quadrant type={{'urgent': true, 'important': true}}
                  name='Do'
        />
        <div className='quadrant__wrapper_text-vertical'>
          <div className='quadrant__text-north'>important</div>
        </div>
        <Quadrant type={{'urgent': false, 'important': true}}
                  name='Plan'
        />
        <div className='quadrant__wrapper_text-horizontal-left'>
          urgent
        </div>
        <div className='quadrant__wrapper_text-horizontal-right'>
          not urgent
        </div>
        <Quadrant type={{'urgent': true, 'important': false}}
                  name='Delegate'
                  />
        <div className='quadrant__wrapper_text-vertical'>
          <div className='quadrant__text-south'>not important</div>
        </div>
        <Quadrant type={{'urgent': false, 'important': false}}
                  name='Drop'
        />
      </div>
    )
  }

  render() {
    return (
      <PageLayout >
        {this.renderTasksTable()}
        <BottomButton type={'all'}/>
      </PageLayout>
    );
  }
}

