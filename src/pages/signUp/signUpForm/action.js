import { post } from '../../../utils/fetcher';
import { SIGN_UP } from '../../../utils/actionTypes';

export function signUp(email, password) {
  return (dispatch) => {
    post('/api/', JSON.stringify({"messageMapId": "add-new-item", "email": email, "password": password}))
      .then((response) => {
        dispatch({
          type: SIGN_UP,
          data: response
        })
      })
  } 
}
