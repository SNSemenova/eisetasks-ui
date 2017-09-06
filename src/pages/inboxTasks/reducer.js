import { SET_INBOX_TASKS, GET_NEW_TASK, REMOVE_TASK, MOVE_INBOX_TASK, UPDATE_TASK_INBOX } from '../../utils/actionTypes';

export default (state = {data:[]}, action) => {
  switch (action.type) {

    case SET_INBOX_TASKS: {
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

    case MOVE_INBOX_TASK: {
      let index = state.data.findIndex((element, index, array) => {return element.id === action.task.id});
      state.data.splice(index, 1);
      return {
        ...state,
        data: [...state.data]
      }
    }

    case GET_NEW_TASK: {
        return Object.assign({}, state, {
            data: [
              action.data.task,
              ...state.data
            ]
        })
    }

    case REMOVE_TASK: {
      for (var elem in action.tasks) {
        for (let i = 0; i < state.data.length; i++) {
          if (state.data[i].id===elem) {
            state.data.splice(i, 1); 
          }
        }
      }
      return {
        ...state,
        data: [...state.data]    
      }   
    }

    case UPDATE_TASK_INBOX: {
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






