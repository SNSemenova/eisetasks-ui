import { CHECK_FILTER } from '../../../utils/actionTypes';
import { FINISH_MARKING } from '../../../utils/actionTypes';

export default (state = {marking: false, clicked: {}}, action) => {
  switch (action.type) {

    case CHECK_FILTER: {
      return {
        ...state,
        marking: action.marking,
        name: action.name,
        clicked: {...state.clicked, [action.name]: true}
      }
    }

    case FINISH_MARKING: {
      return {
        ...state,
        marking: action.marking,
        name: action.name
      }
    }

    default: {
      return state;
    }
  }    
}