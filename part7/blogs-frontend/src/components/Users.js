import React, {useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux"
import {initializeUsers} from "../reducers/usersReducer"
import {Link} from 'react-router-dom'

export const UserExtended = ({ user }) => {
    if (!user){
        return null
    }
    return(
        <div>
            <h1>Blogs by {user.name}</h1>
            <h2>Full list:</h2>
            <ul>
                {user.blogs.map(blog => <li key={blog.id}>{blog.title}</li>)}
            </ul>
        </div>
)}

const User = ({user}) =>{
    return(
        <tr>
            <td>
                <Link to={`/users/${user.id}`}>
                    {user.username}
                </Link>
            </td>
            <td>
                {(user.blogs) ? Object.keys(user.blogs).length : '0'}
            </td>
        </tr>
    )
}

const UserList = () =>{
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(initializeUsers())
        },[dispatch])

    const users = useSelector(state => {
        return state.users
    })

    return(
        <div>
            <table>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Blogs</th>
                </tr>
                </thead>
                <tbody>
                {users.map(user =>
                    <User
                        key={user.id}
                        user={user}
                    />
                )}
                </tbody>
            </table>
        </div>
    )
}

const Users = () => {
    return(
        <div>
            <h2>List of all users</h2>
            <UserList />
        </div>
    )
}

export default Users