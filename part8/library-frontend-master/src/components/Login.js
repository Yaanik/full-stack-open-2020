import React, { useState, useEffect } from "react";
import { useMutation, useLazyQuery } from "@apollo/client";
import { LOGIN, ME } from "../queries";

const Login = ({show, setToken, setPage, setFavorite}) => {
    const [username, setUsername] = useState('admin')
    const [password, setPassword] = useState('password')

    const [getFavorite] = useLazyQuery(ME, {
        onCompleted: (data) => {
            const favoriteGenre = data.me.favoriteGenre
            setFavorite(favoriteGenre)
            localStorage.setItem('favoriteGenre', favoriteGenre)
        }
    })

    const [ login, result ] = useMutation(LOGIN, {
        onError: (error) => {
            console.log(error.graphQLErrors[0].message)
        },
        onCompleted: (data  ) => {
            const token = data.login.value
            setToken(token)
            localStorage.setItem('user-token', token)
            getFavorite()
            setPage('authors')
        }
    })

    // useEffect(() => {
    //     if ( result.data ) {
    //         const token = result.data.login.value
    //         setToken(token)
    //         localStorage.setItem('user-token', token)
    //     }
    // }, [result.data])

    // const [login] = useMutation(LOGIN, {
    //     onError: (error) => {
    //         console.log(error)
    //     },
    //     onCompleted: (data) => {
    //         const token = data.login.value
    //         getGenre()
    //         setToken(token)
    //         localStorage.setItem('user', token)
    //     }
    // })

    console.log(result.data)

    const submit = (event) => {
        event.preventDefault()
        login({variables: {username, password} })
        setUsername('')
        setPassword('')
    }

    if (!show) {
        return null
    }

    return (
        <div>
            <form onSubmit={submit}>
                <div>
                    Username
                    <input
                        value={username}
                        onChange={({ target }) => setUsername(target.value)}
                    />
                </div>
                <div>
                    Password
                    <input
                        value={password}
                        onChange={({ target }) => setPassword(target.value)}
                    />
                </div>
                <button type='submit'>Login</button>
            </form>
        </div>
    )
}

export default Login