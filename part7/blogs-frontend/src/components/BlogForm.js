import React, { useState } from 'react';
import {useDispatch} from "react-redux"
import {createBlog} from "../reducers/blogReducer"
import {setNotification} from "../reducers/notificationReducer"
import {useField} from "../hooks"

import {Form, Button, Col} from 'react-bootstrap'

const BlogForm = () => {
    const dispatch = useDispatch()

    const author = useField('text')
    const title = useField('text')
    const url = useField('text')

    const addBlog = async (event) => {
        event.preventDefault();

        const blog = {
            author: author.input.value,
            title: title.input.value,
            url: url.input.value
        }

        //Checks if the form fields are not empty
        if(!blog.author.length || !blog.title.length || !blog.url.length){
            dispatch(setNotification(
                {message: 'Please fill in all the forms!', style: 'danger' }, 5))
        } else {
            author.reset()
            title.reset()
            url.reset()

            dispatch(createBlog(blog))
            dispatch(setNotification({message: `${blog.title} was added successfully`, style: 'success'}, 5))
        }

    };

    return(
        <div className="formDiv">
            <Form onSubmit={addBlog}>
                <Form.Row>
                    <Form.Group as={Col}>
                        <Form.Label>Title:</Form.Label>
                        <Form.Control placeholder="Title:" {...title.input}/>

                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label>Author:</Form.Label>
                        <Form.Control placeholder="Author:" {...author.input}/>

                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label>URL:</Form.Label>
                        <Form.Control placeholder="URL:" {...url.input}/>
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Button id="submitBlog" type="submit">Add blog</Button>
                    </Form.Group>
                </Form.Row>

            </Form>
        </div>
    );
};

export default BlogForm;