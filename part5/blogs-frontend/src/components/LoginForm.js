import React, { useState } from 'react';
import loginService from '../services/login';
import blogService from '../services/blogs';

const LoginForm = ({ handleMessage, handleUser }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (event) => {
        event.preventDefault();
        try{
            const user = await loginService.login({
                username, password
            });

            window.localStorage.setItem(
                'loggedBlogsappUser', JSON.stringify(user)
            );

            blogService.setToken(user.token);
            handleUser(user);
            setUsername('');
            setPassword('');

        }catch(exception){
            handleMessage('Incorrect username/password', 'error');
        }
    };

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };


    return(
        <form onSubmit={handleLogin}>
            <div>
                Username:
                <input
                    type="text"
                    id="username"
                    value={username}
                    name="Username"
                    onChange={handleUsernameChange}
                />
            </div>
            <div>
                Password:
                <input
                    type="password"
                    id="password"
                    value={password}
                    name="Password"
                    onChange={handlePasswordChange}
                />
            </div>
            <button id="login-button" type="submit">Login</button>
        </form>
    );
};

export default LoginForm;