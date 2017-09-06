import { CHECK_FILTER, FINISH_MARKING, REMOVE_TASK, CLEAR_MARKED} from '../../../utils/actionTypes';
import { post } from '../../../utils/fetcher';

export function isReadyToMark(name) {
    return (dispatch) => {
      return dispatch( {
        type: CHECK_FILTER,
        marking: true,        
        name: name
    })
  }
}

export function finishMarking() {
    return (dispatch) => {
      return dispatch( {
        type: FINISH_MARKING,
        criterionToMark: null,
        marking: false,
        name: null,
        clicked: null
    })
  }
}

export function removeTasks(tasks) {
	return (dispatch) => {
      return dispatch( {
        type: REMOVE_TASK,
        tasks: tasks
    })
  }
}

export function sendMarking(criteria, elem) {
  criteria[elem]['id'] = elem;
  return (dispatch) => {
    post('/api/', JSON.stringify({
      'messageMapId': 'mark-tasks',
      'id': criteria[elem]['id'],
      'type': 2,
      'important': criteria[elem]['Important'],
      'urgent': criteria[elem]['Urgent'],
      'clear': criteria[elem]['Clear']
    }))
    .then(() => {
      return dispatch({
          type: CLEAR_MARKED,
          task: elem
        })
      })
  }
}


