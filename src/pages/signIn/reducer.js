import { SET_TOKEN, DELETE_TOKEN, CLEAR_FLAG } from '../../utils/actionTypes';

export default (state = {data: []}, action) => {
  switch (action.type) {
    case SET_TOKEN: {
      let newflag
      newflag = !(action.data.message === 'Authorisation error' || action.data.message === 'Not registered');
      return {
        ...state,
        data: action.data,
        flag: newflag
      }      
    }

    case DELETE_TOKEN: {
      return {
        ...state,
        flag: null
      }      
    }

    case CLEAR_FLAG: {
      return {
        ...state,
        flag: null
      }
    }

    default: {
      return state;
    }
  }    
}