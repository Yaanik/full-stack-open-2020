import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from "react-redux"
import {addLike, deleteBlog, initializeBlogs} from '../reducers/blogReducer'
import {setNotification} from "../reducers/notificationReducer"

import {Table} from 'react-bootstrap'

import BlogForm from '../components/BlogForm'
import Comments, {CommentForm} from "../components/Comments"

import {Link} from "react-router-dom"

export const Blog = ({blog}) => {
    const dispatch = useDispatch()

    const currentUser = useSelector(state => state.login)

    const handleLike = (blog) => {
        dispatch(addLike(blog))
        dispatch(setNotification(`You voted for ${blog.title}!`, 5))
    }

    const handleDelete = (blog) => {
        if(window.confirm('Are you sure want to delete this blog?')){
            dispatch(deleteBlog(blog))
            dispatch(setNotification({message: `${blog.title} by ${blog.author} was removed!`, style: 'info'}, 5))
        }
    }

    const deleteButton = (blog) => {
        return(
            <button onClick={() => handleDelete(blog)}>Delete</button>
        )}

    if (!blog){
        return null
    }
    return (
        <div className='container'>
            <h1>{blog.title}</h1>
            <div className='container'>Link: {blog.url}</div>
            <div className='container'>Likes: {blog.likes} <button onClick={() => handleLike(blog)}>❤</button> </div>
            <div className='container'>Added by {blog.user.username}</div>
            {
                currentUser.username === blog.user.username && deleteButton(blog)
            }
            <Comments comments={blog.comments} key={blog.id}/>
            <CommentForm blog={blog}/>
        </div>
    );
}

const BlogList = () => {
    const dispatch = useDispatch()

    const blogs = useSelector(state => {
        return state.blogs
    })

    useEffect(() => {
        dispatch(initializeBlogs())
    }, [dispatch])

    return(
        <Table hover>
            <tbody>
                    {blogs.sort((a,b) => b.likes - a.likes).map(blog =>
                        <tr key={blog.id}>
                            <td>
                                <Link to={`/blogs/${blog.id}`} >
                                    {blog.title}
                                </Link>
                            </td>
                            <td>
                                {blog.author}
                            </td>
                        </tr>
                    )}
            </tbody>
        </Table>

    )
}

const Blogs = () => {
    return(
        <div>
            <h2>New blogs</h2>
            <BlogForm />
            <BlogList />
        </div>
    )
}

export default Blogs