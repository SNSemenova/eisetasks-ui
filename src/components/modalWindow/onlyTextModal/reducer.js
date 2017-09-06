import { SET_OPEN_MODAL } from '../../../utils/actionTypes';

export default (state = {openModal: []}, action) => {
  switch (action.type) {

    case SET_OPEN_MODAL: {
      return Object.assign({}, state, {
        ...state,
        openModal: action.flag
      })
    }

    default: {
      return state;
    }
  }
}