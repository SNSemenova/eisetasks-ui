import { CHECK_TASK } from '../../utils/actionTypes';

export default (state = {}, action) => {
  switch (action.type) {

    case CHECK_TASK: {  
      state = action;
      return state;
    }

    default: {
      return state;
    }
  }    
}