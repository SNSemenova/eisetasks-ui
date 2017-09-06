import { post } from '../../utils/fetcher';
import cookie from 'react-cookies';
import {
  SET_LENGTH_TASKS_UI,
  SET_LENGTH_TASKS_NUNI,
  SET_LENGTH_TASKS_UNI,
  SET_LENGTH_TASKS_NUI,
  SET_TASKS_UI,
  SET_TASKS_NUI,
  SET_TASKS_UNI,
  SET_TASKS_NUNI,
  SET_TODO_QUANDRANT_PAGE
} from '../../utils/actionTypes';

let lengthActionTypes = {
  true: {
    true: SET_LENGTH_TASKS_UI,
    false: SET_LENGTH_TASKS_UNI
  },
  false: {
    true: SET_LENGTH_TASKS_NUI,
    false: SET_LENGTH_TASKS_NUNI
  }
};

let tasksActionTypes = {
  true: {
    true: SET_TASKS_UI,
    false: SET_TASKS_UNI
  },
  false: {
    true: SET_TASKS_NUI,
    false: SET_TASKS_NUNI
  }
};

export function getLengthTasks(state) {
  return (dispatch) => {
     let setType = lengthActionTypes[state.urgent][state.important];
    post('/api/', JSON.stringify(
      {
        'messageMapId': 'get-length-list',
        'type': 1,
        'token': cookie.load('sessionID'),
        'important': state.important,
        'urgent': state.urgent,
        'clear': true
      }
    ))
      .then((response) => {
        dispatch({
          type: setType,
          length: response
        })
      })
  }
}

export function getTasks(state,pageNumber) {
  return (dispatch) => {
    let setType = tasksActionTypes[state.urgent][state.important];
    post('/api/', JSON.stringify(
      {
        'messageMapId': 'get-filter-tasks',
        'type': 1,
        'page': pageNumber,
        'size': 6,
        'important': state.important,
        'urgent': state.urgent,
        'clear': true
      }
    ))
    .then((response) => {
      dispatch({
        type: setType,
        tasks: response.tasks
      })
    })
  }
}

export function setPageQuandrant(name) {
  return (dispatch) => {
    dispatch({
      type: SET_TODO_QUANDRANT_PAGE,
      page: name
    })
  }
}