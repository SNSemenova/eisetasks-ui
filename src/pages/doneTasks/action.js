import { post } from '../../utils/fetcher';
import { SET_DONE_TASKS } from '../../utils/actionTypes';

export function getDoneData(pageSize, pageNumber, bool) {
  return (dispatch) => {
    post('/api/', JSON.stringify({"messageMapId": "get-all-tasks", "type": 4, "size": pageSize, "page": pageNumber}))
      .then((response) => {
        dispatch({
          type: SET_DONE_TASKS,
          data: response,
          pages: pageNumber,
          flag: bool
        })
      })
  }
}