import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getModal } from '../../components/modalWindow/onlyTextModal/action';

var timer;
class Timer extends Component {

  componentDidMount() {
    timer = setInterval(this.tick, 50);
  }

  constructor() {
    super();
    this.state = {
      elapsed: false
    };
    this.tick = this.tick.bind(this);
  }

  componentWillUnmount() {
    clearInterval(timer);
  }

  tick() {
    if (timer !== undefined)
      this.setState({elapsed: new Date() - this.props.start});
  }

  render() {
    let elapsed = Math.round(this.state.elapsed / 100);
    let seconds = (this.props.timeStart - (elapsed / 10)).toFixed(1);
    if (seconds < 0) {
      timer = undefined;
      clearInterval(timer); 
      this.props.openModal(false);
    }
    return (
      <div/>
    );
  }
}

Timer.propTypes = {
};

const mapDispatchToProps = (dispatch) => ({
  openModal: bindActionCreators(getModal, dispatch)
});

export default connect(undefined, mapDispatchToProps)(Timer);