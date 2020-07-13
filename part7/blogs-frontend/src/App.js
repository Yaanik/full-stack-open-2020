import React,{ useEffect } from 'react';
import {useDispatch, useSelector} from "react-redux"
import {
    Switch, Route, Link, useRouteMatch
} from "react-router-dom"

//Components
import Notification from './components/Notification';
import LoginForm from './components/LoginForm';
import Blogs, {Blog} from "./components/Blogs"
import Users, {UserExtended} from "./components/Users"
//Services
import blogService from './services/blogs';

//CSS
import './index.css';
import {Button, Navbar, Nav, Container} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'

import {loggedIn} from './reducers/loginReducer'

const App = () => {
    const dispatch = useDispatch()

    const loggedUser = useSelector(state => state.login)
    const blogs = useSelector(state => state.blogs)
    const users = useSelector(state => state.users)
    const comments = useSelector(state => state.comments)


    const matchBlog = useRouteMatch('/blogs/:id')
    const blog = matchBlog
        ? blogs.find(blog => blog.id === matchBlog.params.id)
        : null

    const matchUser = useRouteMatch('/users/:id')
    const user = matchUser
        ? users.find(user => user.id === matchUser.params.id)
        : null

    const matchComments = useRouteMatch('/blogs/:id/comments')
    const blogComments  = matchComments
        ? comments.find(comment => comment.id === matchComments.params.id)
        : null

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('user');
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON);
            dispatch(loggedIn(user));
            blogService.setToken(user.token);
        }
    }, [dispatch]);

    const handleLogout = async () => {
        window.localStorage.removeItem('user');
        dispatch(loggedIn(null))
    };

    if (loggedUser === null) {
        return (
            <div className='container'>
                <Notification />
                <h2>Please login to access the application</h2>
                <LoginForm/>
            </div>
        );
    }

    return (
        <div className='container'>
            <Navbar >
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />

                <Nav className="mr-auto">

                        <Nav.Link href="#" as="span">
                            <Link className="nav-link" to='/home'>Home </Link>
                        </Nav.Link>
                        <Nav.Link href="#" as="span">
                            <Link className="nav-link" to='/blogs'>Blogs </Link>
                        </Nav.Link>
                        <Nav.Link href="#" as="span">
                            <Link className="nav-link" to='/users'>Users </Link>
                        </Nav.Link>
                    </Nav>
                    <Navbar.Text className="mr-sm-2">
                        {loggedUser.name} logged in <Button variant="outline-primary"
                                                            onClick={handleLogout}>Logout</Button>
                    </Navbar.Text>
            </Navbar>
            <Notification />
            <Switch>
                <Route path="/home">
                    <div className='container'>
                        Welcome home
                    </div>
                </Route>
                <Route path="/blogs/:id">
                    <Blog blog={blog} comments={blogComments}/>
                </Route>
                <Route path="/blogs/">
                    <Blogs />
                </Route>
                <Route path="/users/:id">
                    <UserExtended user={user}/>
                </Route>
                <Route path="/users">
                    <Users />
                </Route>
            </Switch>
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
* 5.16 - DONE
*
* 7.9 - DONE
* 7.10 - DONE
* 7.11 - DONE
* 7.12 - DONE
* 7.13 - DONE
* 7.14 - DONE
* 7.15 - DONE
* 7.16 - DONE
* 7.17
* 7.18
* 7.19
*
*
*
*
*
* */

