import React from 'react';
import {useDispatch} from "react-redux"

import {loginRequest} from "../reducers/loginReducer"
import {useField} from "../hooks"

import {Form, Button} from 'react-bootstrap'


const LoginForm = () => {
    const username = useField('username')
    const password = useField('password')

    const dispatch = useDispatch()

    const handleLogin = async (event) => {
        event.preventDefault()
        const credentials = {
            username: username.input.value,
            password: password.input.value
        }

        try{
            dispatch(loginRequest(credentials))
        } catch (e) {
            console.log(e, 'e from try catch')
        }
    }

    return(
        <Form onSubmit={handleLogin} className="mb-3">

            <Form.Group>
                <Form.Label>Username:</Form.Label>
                <Form.Control placeholder="Username" {...username.input}/>
            </Form.Group>
            <Form.Group>
                <Form.Label>Password:</Form.Label>
                <Form.Control placeholder="Password" {...password.input}/>
            </Form.Group>
            <Button id="login-button" type="submit">Login</Button>
        </Form>
    );
};

export default LoginForm;