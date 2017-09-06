import { SET_OPEN_MODAL } from '../../../utils/actionTypes';

export function getModal(f) {
  return (dispatch) => {
    dispatch({
      type: SET_OPEN_MODAL,
      flag: f
    })
  }
}