import loginService from "../services/login"
import {setNotification} from "./notificationReducer"


//TODO: find out where to put login validation
const loginReducer = (state = null, action) => {
    switch(action.type){
        case 'LOGIN_REQUEST':
            return state = action.data
        case 'LOGIN_FAILURE':
            return null
        case 'LOGIN_SUCCESS':
            return state = action.data
        default:
            return state
    }
}

export const loggedIn = (data) => {
    return dispatch =>{
        dispatch({
            type: 'LOGIN_SUCCESS',
            data: data
        })
    }
}

export const loginFailed = (error) =>{
    return dispatch => {
        dispatch({
            type: 'LOGIN_FAILURE',
            error
        })
        dispatch(setNotification('Incorrect login credentials', 5))
    }
}

export const loginSuccess = (data) =>{
    return dispatch => {
        window.localStorage.setItem(
            'user', JSON.stringify(data)
        )
        dispatch({
            type: 'LOGIN_SUCCESS',
            data
        })
    }
}

export const loginRequest = (data) =>{
    return async dispatch => {
       await loginService
            .login(data)
            .then(data => {
                dispatch(loginSuccess(data))
            })
            .catch(err => {
                dispatch(loginFailed(err))
            })


    }
}



export default loginReducer