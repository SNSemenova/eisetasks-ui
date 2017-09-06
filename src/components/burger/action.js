import { post } from '../../utils/fetcher';
import { DELETE_TOKEN } from '../../utils/actionTypes';

export function deleteToken() {
  return (dispatch) => {
    return dispatch( {
      type: DELETE_TOKEN,
      flag: false
    })
  }
}

export function signOut(id) {
  return (dispatch) => {
    post('/api/', JSON.stringify({"messageMapId": "sign-out", "id": id}))
  }
}