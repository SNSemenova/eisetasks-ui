import { SET_POSTPONED_TASKS, UPDATE_TASK_POSTPONED, MOVE_POSTPONED_TASK } from '../../utils/actionTypes';

export default (state = {data: []}, action) => {

  switch (action.type) {

    case SET_POSTPONED_TASKS: {
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

    case MOVE_POSTPONED_TASK: {
      let index = state.data.findIndex((element, index, array) => {return element.id === action.task.id});
      state.data.splice(index, 1);
      return {
        ...state,
        data: [...state.data]
      }
    }

    case UPDATE_TASK_POSTPONED: {
      let number;
      for (let i = 0; i < state.data.length; i++) {
        if (state.data[i].id===action.task.id)
          number = i;
      }
      state.data.splice(number, 1, action.task);
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