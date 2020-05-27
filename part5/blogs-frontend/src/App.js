import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
import Message from './components/Message';
import BlogForm from './components/BlogForm';
import LoginForm from './components/LoginForm';
import Togglable from './components/Togglable';
import blogService from './services/blogs';

import './index.css';

const App = () => {
    const [blogs, setBlogs] = useState([]);

    const [message, setMessage] = useState(null);
    const [messageStyle, setMessageStyle] = useState('');

    const [user, setUser] = useState(null);

    useEffect(() => {
        blogService
            .getAll()
            .then(blogs => {
                blogs.sort((a, b) => b.likes - a.likes);
                setBlogs(blogs);
            });
    }, []);

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogsappUser');
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON);
            setUser(user);
            blogService.setToken(user.token);
        }
    }, []);

    const handleLogout = async () => {
        window.localStorage.removeItem('loggedBlogsappUser');
        setUser(null);
    };

    const loginForm = () => (
        <LoginForm
            handleMessage={handleMessage}
            handleUser={setUser}
        />
    );


    const handleMessage = (message, type) => {
        setMessage(message);
        setMessageStyle(type);
        setTimeout(() => {
            setMessage(null);
            setMessageStyle(null);
        }, 5000);
    };

    const handleLike = (id) => {
        const blogIndex = blogs.findIndex(blog => blog.id === id);
        const blog = blogs.find(blog => blog.id === id);
        const newBlogs = [
            ...blogs
        ];
        newBlogs[blogIndex].likes += 1;
        blogService
            .update(id, blog)
            .then(returnedBlog => {
                setBlogs(newBlogs);
            });
    };
    const blogFormRef = React.createRef();

    const deleteBlog = (id) => {
        const newBlogs = blogs.filter(blog => blog.id !== id);
        blogService
            .remove(id)
            .then(returnedBlog => {
                setBlogs(newBlogs);
            });
    };

    const addBlog = (blogObject) => {
        blogFormRef.current.toggleVisibility();
        blogService
            .create(blogObject)
            .then(returnedBlog => {

                //A very ugly way to make sure that likes don't break the entire thing
                returnedBlog.user = {
                    id: returnedBlog.user,
                    username: user.username,
                    name: user.name
                }
                setBlogs(blogs.concat(returnedBlog));
            });
    };


    const blogForm = () => (
        <Togglable buttonLabel="Add new blog" ref={blogFormRef}>
            <BlogForm createBlog={addBlog} handleMessage={handleMessage} user={user}/>
        </Togglable>
    );

    if (user === null) {
        return (
            <div>
                <Message msg={message} style={messageStyle}></Message>
                <h2>Please login to access the application</h2>
                {loginForm()}
            </div>
        );
    }

    return (
        <div>
            <Message msg={message} style={messageStyle}></Message>
            <h2>Blogs</h2>
            <p>
                {user.name} logged in
                <button onClick={handleLogout}>Logout</button>
            </p>
            <div>
                <div>
                    <h2>New blogs</h2>
                    {blogForm()}
                </div>
            </div>
            <div>
                {blogs.map(blog =>
                    <Blog
                        key={blog.id}
                        blog={blog}
                        handleLike={() => handleLike(blog.id)}
                        removeBlog={() => deleteBlog(blog.id)}
                        handleMessage={handleMessage}
                        user={user}/>
                )}
            </div>
        </div>
    );
};

export default App;

/*
* 5.1 - DONE
* 5.2 - DONE
* 5.3 - DONE
* 5.4 - DONE
* 5.5 - DONE
* 5.6 - DONE
* 5.7 - DONE
* 5.8 - DONE
* 5.9 - DONE
* 5.10 - DONE
* 5.11 - DONE
* 5.12 - DONE
* 5.13 - DONE
* 5.14 - DONE
* 5.15 - DONE
* 5.16 - DONE :DDDDD
* */