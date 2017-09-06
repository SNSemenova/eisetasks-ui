import { post } from '../../utils/fetcher';
import { SET_INBOX_TASKS } from '../../utils/actionTypes';

export function getInboxData(pageSize, pageNumber, bool) {
  return (dispatch) => {
    post('/api/', JSON.stringify({"messageMapId": "get-all-tasks", "type": 2, "size": pageSize, "page": pageNumber}))
      .then((response) => {
        dispatch({
          type: SET_INBOX_TASKS,
          data: response,
          pages: pageNumber,
          flag: bool
        })
      })
  }
}