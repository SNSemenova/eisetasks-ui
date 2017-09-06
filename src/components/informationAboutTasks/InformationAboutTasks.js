import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  URGENT_AND_IMPORTANT_URL,
  URGENT_AND_NOT_IMPORTANT_URL,
  NOT_URGENT_AND_IMPORTANT_URL,
  NOT_URGENT_AND_NOT_IMPORTANT_URL
} from '../../utils/urlTypes';
import './style.css';

class InformationAboutTasks extends Component {

  static propTypes = {};

  static contextTypes = {
    router: PropTypes.object,
  };

  URI_map = {
    true: {
      true: URGENT_AND_IMPORTANT_URL,
      false: URGENT_AND_NOT_IMPORTANT_URL
    },
    false: {
      true: NOT_URGENT_AND_IMPORTANT_URL,
      false: NOT_URGENT_AND_NOT_IMPORTANT_URL
    }
  };

  constructor() {
    super();
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    let URI = this.URI_map[this.props.type.urgent][this.props.type.important];
    if (window.innerWidth < 1020) {
      this.context.router.history.push(URI);
    }
  }

  render() {
    let name = this.props.length !== 1 ? this.props.name+'s' : this.props.name;
    let styleImageOne = this.props.type.important ? 'image__important-true' : 'image__important-false';
    let styleImageTwo = this.props.type.urgent ? 'image__urgent-true' : 'image__urgent-false';
    const styleInfoBlock = `info-task__block color-block-${this.props.blockName}`;
    const styleImageBlock = `info-task__wrapper-img-${this.props.blockName}`;
    return (
      <div className={styleInfoBlock} onClick={this.onClick}>
        <div className='block__middle-text'>
          {this.props.blockName}
        </div>
        <div className='block__number'>
          {this.props.length}
          <div className='block__number-text'>
            {name}
          </div>
        </div>
        <div/>
        <div className={styleImageBlock}>
          <div className={styleImageOne}/>
          <div className={styleImageTwo}/>
        </div>
        {this.props.children}
      </div>
    );
  }
}

InformationAboutTasks.propTypes = {
  length: React.PropTypes.number,
  name: React.PropTypes.string,
  type: React.PropTypes.object,
  blockName: React.PropTypes.string,
};

export default InformationAboutTasks;