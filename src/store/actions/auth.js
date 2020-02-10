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
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
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
    return dispatch => {
        // setTimeout(()=>{
        //     dispatch(authLogout())
        // }, expireInTime || 5000)
    }
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
        }
    }
}

export const auth = (email, password, isSignup) => {
    return dispatch => {
        dispatch(authStart())
        const data = {
            email: email,
            password: password
        }
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDEbT71-JJUwj_xvBEfR-ZsWvFI3nk-WmY'
        if (!isSignup) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDEbT71-JJUwj_xvBEfR-ZsWvFI3nk-WmY'
        }
        axios.post(url, data)
            .then(response => {
                console.log(response)
                if (response.data.expiresIn) {
                    const expirationDate = new Date(new Date().getTime + 3600 * 1000)
                    console.log('expirationDate',expirationDate)
                    localStorage.setItem('expirationDate', expirationDate)
                }
                localStorage.setItem('token', response.data.idToken)
                localStorage.setItem('userId', response.data.userId)
                dispatch(authSuccess(response.data.idToken, response.data.localId))
                dispatch(checkAuthTimeout(response.data.expiresIn))
            })
            .catch(error => {
                dispatch(authFail(error.response.data.error))
            })

        console.log('email', email, 'password', password)
    }
}
