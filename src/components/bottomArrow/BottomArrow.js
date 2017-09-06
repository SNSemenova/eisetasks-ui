import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {
  URGENT_AND_IMPORTANT_URL,
  URGENT_AND_NOT_IMPORTANT_URL,
  NOT_URGENT_AND_IMPORTANT_URL,
  NOT_URGENT_AND_NOT_IMPORTANT_URL
} from '../../utils/urlTypes'

import './style.css';


class BottomArrow extends Component {
  arrowsMap = {
    'left': {
      true: {
        true: {
          direction: 'down',
          link: URGENT_AND_NOT_IMPORTANT_URL
        },
        false: {
          direction: 'up',
          link: URGENT_AND_IMPORTANT_URL
        }
      },
      false: {
        true: {
          direction: 'left',
          link: URGENT_AND_IMPORTANT_URL
        },
        false: {
          direction: 'left',
          link: URGENT_AND_NOT_IMPORTANT_URL
        }
      }
    },
    'right': {
      true: {
        true: {
          direction: 'right',
          link: NOT_URGENT_AND_IMPORTANT_URL
        },
        false: {
          direction: 'right',
          link: NOT_URGENT_AND_NOT_IMPORTANT_URL
        }
      },
      false: {
        true: {
          direction: 'down',
          link: NOT_URGENT_AND_NOT_IMPORTANT_URL
        },
        false: {
          direction: 'up',
          link: NOT_URGENT_AND_IMPORTANT_URL
        }
      }
    }
  };

  constructor() {
    super();
    this.getArrow = this.getArrow.bind(this);
  }

  getArrow(arrowSide, type){
    return(
      this.arrowsMap[arrowSide][type.urgent][type.important]
    );
  }

  render() {
    let arrow = this.getArrow(this.props.arrowSide, this.props.quadrandType);
    let arrowSide = this.props.arrowSide;
    return (
      <div>
        <div className={`wrapper__arrow_bottom-${arrowSide}`} >
          <Link className={`arrow__bottom-${arrow.direction}`} to={arrow.link}/>
        </div>
      </div>
    );
  }
}

BottomArrow.propTypes = {
  typeArrow: React.PropTypes.string,
  path: React.PropTypes.string
};

export default BottomArrow;