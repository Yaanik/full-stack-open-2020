const notificationReducer = (state = '', action) =>{
    switch (action.type){
        case 'SET_NOTIFICATION':
            return state = action.data
        case 'UNSET_NOTIFICATION':
            return ''
        default:
            return state
    }
}

export const setNotification = (notification, seconds) => {
    return dispatch =>{
        dispatch({
            type:'SET_NOTIFICATION',
            data: notification
        })
        setTimeout(() =>{
            dispatch(unsetNotification())
        }, seconds*1000)
    }
}

export const unsetNotification = () =>{
    return dispatch =>{
        dispatch({
            type: 'UNSET_NOTIFICATION'
        })
    }
}

export default notificationReducer