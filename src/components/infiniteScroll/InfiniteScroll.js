import React, {Component} from 'react';
import './style.css';
import ScrollArea from 'react-scrollbar';

export default class InfiniteScroll extends Component {
  pageSize = 6;
  pageNumber = 2;

  constructor(props){
    super(props);
    this.onScroll = this.onScroll.bind(this);
    this.pageSize = 7;
    this.pageNumber = 1;
  }

  onScroll(event){
    const {realHeight, containerHeight, topPosition} = event;
    if ((this.props.hasNext) &&
      (realHeight - topPosition <= containerHeight)) {
      this.pageNumber++;
      this.props.onScroll(this.pageSize, this.pageNumber);
    }
  }

  render() {

    return (
      <ScrollArea
        className={this.props.className ? this.props.className : "scroll__area"}
        speed={0.8}
        smoothScrolling={true}
        onScroll={this.onScroll}
        verticalContainerStyle={{
          "width": "2px",
          "height": "calc(100vh - 95px)",
          "borderLeft":"1px solid rgba(0, 0, 0, 0.16)",
          "opacity":"1",
          "margin":"0 -2px 0 0"
        }}
        verticalScrollbarStyle={{
          "width": "2px",
          "borderRadius": "1px",
          "backgroundColor": "#3fbab4",
          "margin":"0 0 0 -2px"
        }}>
        {this.props.children}
      </ScrollArea>
    );
  }
}

InfiniteScroll.propTypes = {
  children: React.PropTypes.node,
  hasNext: React.PropTypes.bool
};