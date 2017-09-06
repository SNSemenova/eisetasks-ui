import { MARK_TASK, CLEAR_MARKED } from '../../utils/actionTypes';

export default (state = {}, action) => {
  switch (action.type) {

    case MARK_TASK: { 
      let newState = {...state};
      let criterion = action.criterion;
      if (!newState[action.id])
        newState[action.id] = {};
        if (newState[action.id][criterion] === true)
          newState[action.id][criterion] = false
        else 
          newState[action.id][criterion] = true
      return newState;  
    }

    case CLEAR_MARKED: {
      delete state[action.task]
      return state;
    }

    default: {
      return state;
    }
  }    
}