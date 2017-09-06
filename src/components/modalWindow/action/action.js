import { SET_STATE } from '../../../utils/actionTypes';

export function setWindow(state) {
  return (dispatch) => {
    return dispatch( {
      type: SET_STATE,
      data: state
    })
  }
}