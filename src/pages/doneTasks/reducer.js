import { SET_DONE_TASKS, MOVE_DONE_TASK } from '../../utils/actionTypes';

export default (state = {data: []}, action) => {
  switch (action.type) {

    case SET_DONE_TASKS: {
      if (action.pages === 1 && !action.flag) {
        return {
          ...state,
          data: action.data.tasks,
          hasNext: action.data.hasNext,
          message: action.data.message
        }
      } else {
        return {
          ...state,
          data: [...state.data, ...action.data.tasks],
          hasNext: action.data.hasNext
        }
      }
    }

    case MOVE_DONE_TASK: {
      let index = state.data.findIndex((element, index, array) => {return element.id === action.task.id});
      state.data.splice(index, 1);
      return {
        ...state,
        data: [...state.data]
      }
    }

    default: {
      return state;
    }
  }    
}