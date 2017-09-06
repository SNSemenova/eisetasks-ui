import {
  SET_LENGTH_TASKS_UI,
  SET_LENGTH_TASKS_UNI,
  SET_LENGTH_TASKS_NUI,
  SET_LENGTH_TASKS_NUNI,
  SET_TASKS_UI,
  SET_TASKS_NUI,
  SET_TASKS_UNI,
  SET_TASKS_NUNI,
  MOVE_TASK_UI,
  MOVE_TASK_UNI,
  MOVE_TASK_NUI,
  MOVE_TASK_NUNI, UPDATE_TASK_UI, UPDATE_TASK_NUI, UPDATE_TASK_UNI, UPDATE_TASK_NUNI
} from '../../utils/actionTypes';

export default (state = {data: []}, action) => {

  switch (action.type) {

    case SET_LENGTH_TASKS_UI: {
      return Object.assign({}, state, {
        uiTasksLength: action.length.length
      })
    }

    case SET_LENGTH_TASKS_NUI: {
      return Object.assign({}, state, {
        nuiTasksLength: action.length.length
      })
    }

    case SET_LENGTH_TASKS_UNI: {
      return Object.assign({}, state, {
        uniTasksLength: action.length.length
      })
    }

    case SET_LENGTH_TASKS_NUNI: {
      return Object.assign({}, state, {
        nuniTasksLength: action.length.length
      })
    }

    case SET_TASKS_UI: {
      return Object.assign({}, state, {
        uiTasks: Object.assign([], state.uiTasks, action.tasks)
      })
    }

    case SET_TASKS_NUI: {
      return Object.assign({}, state, {
        nuiTasks: Object.assign([], state.nuiTasks, action.tasks)
      })
    }

    case SET_TASKS_UNI: {
      return Object.assign({}, state, {
        uniTasks: Object.assign([], state.uniTasks, action.tasks)
      })
    }

    case SET_TASKS_NUNI: {
      return Object.assign({}, state, {
        nuniTasks: Object.assign([], state.nuniTasks, action.tasks)
      })
    }

    case MOVE_TASK_UI: {
      let index = state.uiTasks.findIndex((element, index, array) => {return element.id === action.task.id});
      state.uiTasks.splice(index, 1);
      return {
        ...state,
        uiTasks: [...state.uiTasks],
        uiTasksLength: state.uiTasksLength - 1
      }
    }

    case MOVE_TASK_UNI: {
      let index = state.uniTasks.findIndex((element, index, array) => {return element.id === action.task.id});
      state.uniTasks.splice(index, 1);
      return {
        ...state,
        uniTasks: [...state.uniTasks],
        uniTasksLength: state.uniTasksLength - 1
      }
    }

    case MOVE_TASK_NUI: {
      let index = state.nuiTasks.findIndex((element, index, array) => {return element.id === action.task.id});
      state.nuiTasks.splice(index, 1);
      return {
        ...state,
        nuiTasks: [...state.nuiTasks],
        nuiTasksLength: state.nuiTasksLength - 1
      }
    }

    case MOVE_TASK_NUNI: {
      let index = state.nuniTasks.findIndex((element, index, array) => {return element.id === action.task.id});
      state.nuniTasks.splice(index, 1);
      return {
        ...state,
        nuniTasks: [...state.nuniTasks],
        nuniTasksLength: state.nuniTasksLength - 1
      }
    }

    case UPDATE_TASK_UI: {
      let index = state.uiTasks.findIndex((element, index, array) => {return element.id === action.task.id});
      state.uiTasks.splice(index, 1, action.task);
      return {
        ...state,
        uiTasks: [...state.uiTasks]
      }
    }

    case UPDATE_TASK_NUI: {
      let index = state.nuiTasks.findIndex((element, index, array) => {return element.id === action.task.id});
      state.nuiTasks.splice(index, 1, action.task);
      return {
        ...state,
        nuiTasks: [...state.nuiTasks]
      }
    }

    case UPDATE_TASK_UNI: {
      let index = state.uniTasks.findIndex((element, index, array) => {return element.id === action.task.id});
      state.uniTasks.splice(index, 1, action.task);
      return {
        ...state,
        uniTasks: [...state.uniTasks]
      }
    }

    case UPDATE_TASK_NUNI: {
      let index = state.nuniTasks.findIndex((element, index, array) => {return element.id === action.task.id});
      state.nuniTasks.splice(index, 1, action.task);
      return {
        ...state,
        nuniTasks: [...state.nuniTasks]
      }
    }

    default: {
      return state;
    }
  }
}