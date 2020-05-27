import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import {render, fireEvent} from '@testing-library/react'
import Blog from './Blog'
import BlogForm from "./BlogForm"

describe('<Blog /> tests', () =>{
    let component
    const blog = {
        title: 'Random title',
        author: 'BigBoss',
        url: 'x.d',
        user: {
            username: test
        }
    }

    const user = {
        username: test
    }

    // beforeEach(() =>{
    //     component = render(
    //         <Blog blog={blog} user={user}/>
    //     )
    // })


    test('a Blog renders only title and author by default', () => {
        component = render(
            <Blog blog={blog} user={user}/>
        )
        const div = component.container.querySelector('.extendedBlog')

        expect(div).toHaveStyle('display: none')
    })

    test('likes and url are shown after the button was clicked', () =>{
        component = render(
            <Blog blog={blog} user={user}/>
        )
        const button = component.getByText('Show more')
        fireEvent.click(button)

        const div = component.container.querySelector('.extendedBlog')
        expect(div).not.toHaveStyle('display: none')
    })

    test('if the like button is clicked twice, the event handler is called twice', () =>{
        const mockHandler = jest.fn()

        const component = render(
            <Blog blog={blog} user={user} handleLike={mockHandler}/>
        )

        const button = component.getByText('Like')
        fireEvent.click(button)
        fireEvent.click(button)

        expect(mockHandler.mock.calls).toHaveLength(2)

    })

    test('event handler get right props when a new blog is called', () => {
        const createBlog = jest.fn()
        const handleMessage = jest.fn()

        const component = render(
            <BlogForm createBlog={createBlog} handleMessage={handleMessage}/>
        )

        const authorInput = component.container.querySelector('#author')
        const titleInput = component.container.querySelector('#title')
        const urlInput = component.container.querySelector('#url')
        const form = component.container.querySelector('form')

        fireEvent.change(authorInput, {
            target: {value: 'newname'}
        })

        fireEvent.change(titleInput, {
            target: {value: 'newtitle'}
        })

        fireEvent.change(urlInput, {
            target: {value: 'newurl'}
        })

        fireEvent.submit(form)

        expect(createBlog.mock.calls).toHaveLength(1);
        expect(createBlog.mock.calls[0][0].author).toBe('newname')
        expect(createBlog.mock.calls[0][0].title).toBe('newtitle')
        expect(createBlog.mock.calls[0][0].url).toBe('newurl')
    })
})
