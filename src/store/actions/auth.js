import * as actionType from './actionTypes';
import axios from 'axios'
export const authSuccess = (idToken, localId) => {
    return {
        type: actionType.AUTH_SUCCESS,
        userId: localId,
        token: idToken
    }
}

export const authFail = (error) => {
    return {
        type: actionType.AUTH_FAIL,
        error: error
    }
}

export const authStart = () => {
    return {
        type: actionType.AUTH_START,
    }
}

export const authLogout = () => {
    console.log('authlogout call')
    return {
        type: actionType.AUTH_INITIAT,
    }
}

export const logoutSucceed =()=> {
    return {
        type: actionType.AUTH_LOGOUT,
    }
}

export const setAuthRedirectPath = (redirectpath) => {
    return {
        type: actionType.SET_AUTH_REDIRECT_PATH,
        redirectPath: redirectpath
    }
}

export const checkAuthTimeout = (expireInTime) => {
    console.log('checkAuthTimeout', expireInTime)
    return {
        type: actionType.AUTH_CHECKOUT_TIME,
        expireInTime: 10000
    }
    // return dispatch => {
    //     // setTimeout(()=>{
    //     //     dispatch(authLogout())
    //     // }, expireInTime || 5000)
    // }
}

export const authCheckState=()=>{
    return dispatch=>{
        const token = localStorage.getItem('token')
        if(!token) {
            dispatch(authLogout())
        }else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if(expirationDate > new Date()) {
                dispatch(authLogout())
            }else {
                const userId = localStorage.getItem('userId');
                dispatch(authSuccess(token, userId));
                dispatch(checkAuthTimeout(expirationDate.getSeconds()- new Date().getSeconds()))
            }
            // dispatch(checkAuthTimeout())
        }
    }
}

export const auth = (email, password, isSignup) => {
    return {
        type: actionType.AUTH_USER_SAGA,
        email: email,
        password: password,
        isSignup: isSignup
    }
}
