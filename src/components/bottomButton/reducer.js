import { SET_TODO_QUANDRANT_PAGE} from '../../utils/actionTypes';

export default (state = {page: '/URGENT_AND_IMPORTANT_URL'}, action) => {
  switch (action.type) {

    case SET_TODO_QUANDRANT_PAGE: {
      return Object.assign({}, state, {
        ...state,
        page: action.page
      })
    }

    default: {
      return state;
    }
  }
}