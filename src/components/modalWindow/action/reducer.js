import { SET_STATE } from '../../../utils/actionTypes';

export default (state = {}, action) => {
    switch (action.type) {

        case SET_STATE: {
            return {
                ...state,
                data: action.data
            }
        }

        default: {
            return state;
        }
    }
}