import React, { Component } from 'react';
import './style.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {isReadyToMark, finishMarking} from './action';
import { I18n } from 'react-redux-i18n';

class Filter extends Component {

  makeChecked() {
    if (this.props.criterionToMark === this.props.name) {
      this.props.finishMarking();
    }
    else {
      this.props.isReadyToMark(this.props.name);
    }
  }

  chooseButton() {
    if (this.props.name===I18n.t('components.filters.clear'))
      return "button-clear";
    if (this.props.name===I18n.t('components.filters.important'))
      return "button-important";
    if (this.props.name===I18n.t('components.filters.urgent'))
      return "button-urgent";
  }

  isChecked() {
    return this.props.criterionToMark === this.props.name;
  }

  render() {
    return (
      <label className={this.props.uiDataKey}>
        <input className="checkCriteria" type="checkbox" value={this.props.name}
               onChange={this.makeChecked.bind(this)} checked={this.isChecked()}/>
        <div className={this.chooseButton()} />
        <div className="filter-name">{this.props.name}</div>
      </label>
    );
  }
}

Filter.propTypes = {
  name: React.PropTypes.string
};

const mapStateToProps = (state) => {
  return {
    criterionToMark: state.criteriaReducer.name
  }
};

const mapDispatchToProps = (dispatch) => ({
  isReadyToMark: bindActionCreators(isReadyToMark, dispatch), 
  finishMarking: bindActionCreators(finishMarking, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Filter);