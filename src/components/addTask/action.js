import { post } from '../../utils/fetcher';
import {
  GET_NEW_TASK,
  UPDATE_TASK_POSTPONED,
  UPDATE_TASK_INBOX,
  UPDATE_TASK_UI,
  UPDATE_TASK_UNI,
  UPDATE_TASK_NUI,
  UPDATE_TASK_NUNI
} from '../../utils/actionTypes';

let updateActionTypes = {
  true: {
    true: UPDATE_TASK_UI,
    false: UPDATE_TASK_UNI
  },
  false: {
    true: UPDATE_TASK_NUI,
    false: UPDATE_TASK_NUNI
  }
};

let actionTypeGetters = {
  1: function (task) {return updateActionTypes[task.urgent][task.important]},
  2: function () {return UPDATE_TASK_INBOX},
  3: function () {return UPDATE_TASK_POSTPONED}
};


export function newTask(taskName) {
    return (dispatch) => {
    post('/api/', JSON.stringify(
      {
        'messageMapId': 'add-new-task',
        'taskName': taskName,
        'type': 2,
      }
    ))
    .then((response) => {
      dispatch({
        type: GET_NEW_TASK,
        data:  response,
      })
    })
  }
}

export function updateTask(newTaskName, task, type) {
  let actionTypeGetter = actionTypeGetters[type];
  let actionType = actionTypeGetter(task);
  return (dispatch) => {
    post('/api/', JSON.stringify({
      'messageMapId': 'edit-task',
      'taskName': newTaskName,
      'type': type,
      'id': task.id
    }))
    .then((response) => {
      dispatch({
        type: actionType,
        task: response.task,
      })
    })
  }
}