import React, {useState} from "react"
import {useDispatch} from "react-redux"
import {useField} from "../hooks"
import {setNotification} from "../reducers/notificationReducer"
import {addComment, createBlog} from "../reducers/blogReducer"

const Comment = ({comment}) => {
    return(
        <li>
            {comment.body}
        </li>
    )
}

export const CommentForm = ({blog}) =>{
    const dispatch = useDispatch()
    const commentField = useField('text')

    const createComment = async (event) => {
        event.preventDefault();

        const comment = {
            body: commentField.input.value,
            blog: blog.id
        }

        //Checks if the form fields are not empty
        if(!comment.body.length){
            dispatch(setNotification('You cannot send an empty comment', 5))
        } else {
            commentField.reset()
            dispatch(addComment(blog, comment))
            dispatch(setNotification(`Your comment was successfully added`, 5))
        }

    };

    return(
        <div className="formDiv">
            <form onSubmit={createComment}>
                Comment:
                <input
                    {...commentField.input}
                />
                <button id="submitComment" type="submit">Add comment</button>
            </form>
        </div>
    )
}

const Comments = ({comments}) => {
    //const [comment, setComments] = useState(comments)


    if(!comments){
        return null
    }

    return(
        <ul>
            {comments.map(comment =>
                <Comment
                    key={comment.id}
                    comment={comment}
                />
            )}
        </ul>
    )
}



export default Comments