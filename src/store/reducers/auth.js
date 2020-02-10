import * as actionType from '../actions/actionTypes'
import {updatedObject} from '../utility'
const initialState = {
    loading: false,
    error: null,
    userId: null,
    token: null,
    redirectPath: '/'
}

const authStart =(state)=> {
    return updatedObject(state, {loading: true})
}

const authSuccess =(state, action)=> {
    return updatedObject(state,
        {
            loading: false,
            error: null,
            userId: action.userId,
            token: action.token
        })
}

const authFail =(state, action)=> {
    return updatedObject(state,
        {
            loading: false,
            error: action.error,
        })
}

const authLogout =(state)=> {
    return updatedObject(state,
        {
            ...initialState
        })
}

const setAuthRedirectPath =(state, action)=> {
    return updatedObject(state,
        {
            redirectPath: action.redirectPath
        })
}

const authReducer = (state = initialState, action) =>{
    switch (action.type) {
        case actionType.AUTH_START: return authStart(state);
        case actionType.AUTH_SUCCESS: return authSuccess(state, action)
        case actionType.AUTH_FAIL: return authFail(state, action)
        case actionType.AUTH_LOGOUT: return authLogout(state)
        case actionType.SET_AUTH_REDIRECT_PATH : return setAuthRedirectPath(state, action)
        default:
            return state;
    }
}

export default authReducer;