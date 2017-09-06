import {
  MOVE_DONE_TASK,
  MOVE_POSTPONED_TASK,
  MOVE_INBOX_TASK,
  CHECK_TASK,
  MARK_TASK,
  MOVE_TASK_UI,
  MOVE_TASK_UNI,
  MOVE_TASK_NUI,
  MOVE_TASK_NUNI
} from '../../utils/actionTypes';
import { post } from '../../utils/fetcher';

let todayActionTypes = {
  true: {
    true: MOVE_TASK_UI,
    false: MOVE_TASK_UNI
  },
  false: {
    true: MOVE_TASK_NUI,
    false: MOVE_TASK_NUNI
  }
};


let actionTypeGetters = {
  1: function (task) {return todayActionTypes[task.urgent][task.important]},
  2: function () {return MOVE_INBOX_TASK},
  3: function () {return MOVE_POSTPONED_TASK},
  4: function () {return MOVE_DONE_TASK}
};


export function moveTask(task, state) {
  let actionTypeGetter = actionTypeGetters[state.collection];
  let actionType = actionTypeGetter(task);
  return (dispatch) => {
    post('/api/', JSON.stringify(
      {
        'messageMapId': 'move-task',
        'id': task.id,
        'taskName': task.taskName,
        'type': state.collection,
        'collectionTo': state.collectionTo
      }
    ))
    .then((response) => {
      dispatch({
        type: actionType,
        task: task
      })
    })
  }
}

export function checkTask(checked) {
  return (dispatch) => {
    return dispatch( {
      type: CHECK_TASK,
      checked: checked
    })
  }
}

export function markTask(id, criterion) {
  return (dispatch) => {
    return dispatch( {
      type: MARK_TASK,
      id: id,
      criterion: criterion
    })
  }
}

export function copyTask(id) {
  let request = {"messageMapId": "copy-task"};
  request.id = id;
  request.type = 4;
  request.collectionTo = 2;
  return (dispatch) => {
    post('/api/', JSON.stringify(request))
  }
}