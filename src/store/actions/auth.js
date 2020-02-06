import * as actionType from './actionTypes';
import axios from 'axios'
export const authSuccess =(authData)=>{
    return {
        type: actionType.AUTH_SUCCESS,
        userId: authData.localId,
        token: authData.idToken
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

export const auth =(email, password, isSignup)=> {
    return dispatch=> {
        dispatch(authStart())
        const data = {
            email: email,
            password: password
        }
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDEbT71-JJUwj_xvBEfR-ZsWvFI3nk-WmY'
        if(!isSignup) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDEbT71-JJUwj_xvBEfR-ZsWvFI3nk-WmY'
        }
        axios.post(url, data)
        .then(response=>{
            console.log(response)
            dispatch(authSuccess(response.data))
        })
        .catch(error=>{
            dispatch(authFail(error.response.data.error))
        })

        console.log('email', email, 'password', password)
    }
}
