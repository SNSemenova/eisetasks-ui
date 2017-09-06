import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import './style.css';

class BottomButton extends Component {

  buttonTypes = {
    true: {
      true: 'do',
      false: 'delegate'
    },
    false: {
      true: 'plan',
      false: 'drop'
    },
    undefined: {
      undefined: 'all'
    }
  };
  
  static propTypes = {
  };

  static contextTypes = {
    router: PropTypes.object,
  };

  getButtonType(quadrantType) {
    return this.buttonTypes[quadrantType.urgent][quadrantType.important];
  }
  
  render() {
    let buttonType = this.getButtonType(this.props.type);
    return (
      <div>
        <Link className='wrapper__button-bottom' to='/'>
          <div className={`button-bottom-${buttonType}`}/>
        </Link>
      </div>
    );
  }
}

BottomButton.propTypes = {
  type: React.PropTypes.string
};



const mapStateToProps = (state) => {
  return {
    page: state.appCompReducerTodoPageQuandrant.page,
  }
};


export default connect(mapStateToProps, null)(BottomButton);
