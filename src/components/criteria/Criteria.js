import React, { Component } from 'react';
import './style.css';
import Filter from './filter/Filter';
import { I18n } from 'react-redux-i18n';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { sendMarking, removeTasks, finishMarking } from './filter/action';

class Criteria extends Component {

  componentWillUnmount() {
    this.props.finishMarking();
  }

  chooseClear() {
    let criteria = {};
    for (let elem in this.props.criteria) {
      if (!this.props.criteria[elem].Important) {
          this.props.criteria[elem].Important = false
        }
      if (!this.props.criteria[elem].Urgent) {
        this.props.criteria[elem].Urgent = false
      }
      if (this.props.criteria[elem].Clear) {
        criteria[elem] = this.props.criteria[elem];
      }
    }
    return criteria
  }

  clickCheckMark() {   
    let onlyClear = this.chooseClear();
    this.props.removeTasks(onlyClear); 
    for (let elem in onlyClear) {
        this.props.sendMarking(onlyClear, elem);
    }    
    this.props.finishMarking();
  }

  disableComplete() {
    return Object.keys(this.props.clickedCriteria).length !== 3
  }

  addCheckMark() {
    if (this.props.inMarking)
      return(
        <div className="complete-container">
          <div className="checkMark" onClick={this.clickCheckMark.bind(this)}/>
          <button className="complete" onClick={this.clickCheckMark.bind(this)} disabled={this.disableComplete()}> 
            {I18n.t('components.filters.complete')} 
          </button>
        </div>
        )
  }

  render() {
    return (
      <div className="criteria">      
        <form className="criteria-container">        
          <Filter name={I18n.t('components.filters.important')} uiDataKey='important-criterion'/>
          <Filter name={I18n.t('components.filters.urgent')} uiDataKey='urgent-criterion'/>
          <Filter name={I18n.t('components.filters.clear')} uiDataKey='clear-criterion'/>
        </form>
        {this.addCheckMark()}
      </div>
      );
  }
}

const mapStateToProps = (state) => {
  return {
    tasks: state.appCompReducerInbox.data,
    inMarking: state.criteriaReducer.marking,
    criteria: state.markingReducer,
    clickedCriteria: state.criteriaReducer.clicked
  }
};

const mapDispatchToProps = (dispatch) => ({
  finishMarking: bindActionCreators(finishMarking, dispatch),
  sendMarking: bindActionCreators(sendMarking, dispatch),
  removeTasks: bindActionCreators(removeTasks, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Criteria);