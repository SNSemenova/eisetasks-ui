import { CONFIRM_REG } from '../../utils/actionTypes';

export default (state = {data: []}, action) => {
  switch (action.type) {

    case CONFIRM_REG: {
      return {
        ...state,
        status: action.status
      }
    }

    default: {
      return state;
    }
  }    
}