import React, { useState } from 'react';
import PropTypes from 'prop-types';

const BlogForm = ({ createBlog, handleMessage, user}) => {
    const [blog, setBlog] = useState(
        {
            title: '',
            author: '',
            url: '',
        });

    const handleAuthorChange = async(event) => {
        setBlog({ ...blog, author: event.target.value });
    };
    const handleTitleChange = async(event) => {
        setBlog({ ...blog, title: event.target.value });
    };
    const handleUrlChange = async(event) => {
        setBlog({ ...blog, url: event.target.value });
    };


    const addBlog = (event) => {
        event.preventDefault();

        try {
            createBlog({
                title: blog.title,
                author: blog.author,
                url: blog.url,
            });

            handleMessage(`${blog.title} by ${blog.author} was added successfully`, 'success');
            setBlog({
                title: '',
                author: '',
                url: '',
            })
        } catch (e) {
            handleMessage('Please fill in all the forms', 'error')
        }

    };

    return(
        <div className="formDiv">
            <form onSubmit={addBlog}>
                Title:
                <input
                    id="title"
                    value={blog.title}
                    onChange={handleTitleChange}
                />
                Author:
                <input
                    id="author"
                    value={blog.author}
                    onChange={handleAuthorChange}
                />
                URL:
                <input
                    id="url"
                    value={blog.url}
                    onChange={handleUrlChange}
                />
                <button id="submitBlog" type="submit">Add blog</button>
            </form>
        </div>
    );
};

BlogForm.propTypes = {
    createBlog: PropTypes.func.isRequired,
    handleMessage: PropTypes.func.isRequired
};

export default BlogForm;