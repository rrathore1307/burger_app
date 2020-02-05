import * as actionType from '../actions/actionTypes'

const initialState = {
    loading: false
}

const authReducer = (state = initialState, action) =>{
    switch (action.type) {
        case actionType.AUTH_START:
            return {
                ...state,
                loading: true
            }
        case actionType.AUTH_SUCCESS:
            return {
                ...state,
                loading: false
            }
        case actionType.AUTH_FAIL:
            return {
                ...state,
                loading: false
            }
        default:
            return state;
    }
}

export default authReducer;