import { post } from '../../utils/fetcher';
import { SET_POSTPONED_TASKS } from '../../utils/actionTypes';

export function getPostponedData(pageSize, pageNumber, bool) {
  return (dispatch) => {
    post('/api/', JSON.stringify({"messageMapId": "get-all-tasks", "type": 3, "size": pageSize, "page": pageNumber}))
      .then((response) => {
        dispatch({
          type: SET_POSTPONED_TASKS,
          data: response,
          pages: pageNumber,
          flag: bool
        })
      })
  }
}
