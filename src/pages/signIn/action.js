import { post } from '../../utils/fetcher';

export function setNewPassword(token, password) {
  return (dispatch) => {
    post('/api/', JSON.stringify({"messageMapId": "successful-recovering", "token": token, "password": password}))
  }
}