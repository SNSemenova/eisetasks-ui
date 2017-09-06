import { SIGN_UP } from '../../utils/actionTypes';

export default (state = {data: []}, action) => {
  switch (action.type) {

    case SIGN_UP: {
      return {
        ...state,
        data: action.data
      }
    }

    default: {
      return state;
    }
  }    
}