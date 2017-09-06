import { post } from '../../../utils/fetcher';
import { SET_TOKEN } from '../../../utils/actionTypes';

export function signIn(email, password) {
  return (dispatch) => {
    post('/api/', JSON.stringify({"messageMapId": "authentication", "email": email, "password": password}))
      .then((response) => {
        dispatch({
          type: SET_TOKEN,
          data: response
        })
      })
  }
}
