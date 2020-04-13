import React from 'react'

const Message = ({msg, style})  =>{
    if(msg === null){
        return null
    }

    return(
        <div className={style}>
            {msg}
        </div>
    )
}

export default Message