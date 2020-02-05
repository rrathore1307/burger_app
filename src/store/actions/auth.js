import * as actionType from './actionTypes';

export const authSuccess =(authData)=>{
    return {
        type: actionType.AUTH_SUCCESS,
        authData: authData
    }
}

export const authFail =(error)=>{
    return {
        type: actionType.AUTH_FAIL,
        error: error
    }
}

export const authStart =()=>{
    return {
        type: actionType.AUTH_START,
    }
}

export const auth =(email, password)=> {
    return dispatch=> {
        dispatch(authStart())
        console.log('email', email, 'password', password)
    }
}
