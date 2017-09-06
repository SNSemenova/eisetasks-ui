import { post } from '../../utils/fetcher';
import { SET_STATE } from '../../utils/actionTypes';

export function setNewPassword(token, password) {
  return (dispatch) => {
    post('/api/', JSON.stringify({"messageMapId": "successful-recovering", "token": token, "password": password}))
  }
}

export function setWindow() {
  return (dispatch) => {
    return dispatch( {
      type: SET_STATE,
      data: "recovered"
    })
  }
}