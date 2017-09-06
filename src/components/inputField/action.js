import { CLEAR_FLAG } from "../../utils/actionTypes";

export function clearFlag() {
  return (dispatch) => {
    dispatch({
      type: CLEAR_FLAG
    })
  }
}