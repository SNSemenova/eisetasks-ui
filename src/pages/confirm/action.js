import { post } from '../../utils/fetcher';
import { CONFIRM_REG } from '../../utils/actionTypes';

export function confirmReg(token) {
  return (dispatch) => {
    post('/api/', JSON.stringify({
      "messageMapId": "successful-registration",
      "token": token}))
    .then((response) => {
      dispatch({
        type: CONFIRM_REG,
        status: response
      })
    })
  }
}