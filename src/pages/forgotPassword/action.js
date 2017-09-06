import { post } from '../../utils/fetcher';

export function sendEmail(email) {
  return (dispatch) => {
    post('/api/', JSON.stringify({"messageMapId": "change-password", "email": email}))
  }
}