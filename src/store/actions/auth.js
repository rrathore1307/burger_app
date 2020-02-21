import * as actionType from './actionTypes';
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
    return {
        type: actionType.CHECK_AUTO_AUTH_STATE
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
