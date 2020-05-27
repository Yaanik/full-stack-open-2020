import React, { useState } from 'react';


const Blog = ({ blog, handleLike, removeBlog, user, handleMessage }) => {
    const [visible, setVisible] = useState(false);

    const hideWhenVisible = { display: visible ? 'none' : '' };
    const showWhenVisible = { display: visible ? '' : 'none' };

    const toggleVisibility = () => {
        setVisible(!visible);
    };

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 5,
        paddingBottom: 10,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    };

    const deleteBlog = (event) => {
        event.preventDefault();
        if(window.confirm('Are you sure want to delete this blog?')){
            removeBlog(blog.id);
            handleMessage(`${blog.title} by ${blog.author} was successfully removed!`, 'success');
        }
    };

    const deleteButton = () => (
        <div>
            <form onSubmit={deleteBlog}>
                <button type="submit">Delete this blog</button>
            </form>
        </div>
    );

    return (
        <div style={blogStyle} className="shortBlog">
            <div style={hideWhenVisible}>
                <p>{blog.title} by {blog.author}</p>
                <button className="showMore" onClick={toggleVisibility}>Show more</button>
            </div>
            <div style={showWhenVisible} className="extendedBlog">
                <p>{blog.title} by {blog.author}</p>
                <p>URL: {blog.url}</p>
                <p className="likes">
                  Likes: {blog.likes}
                    <button onClick={handleLike}>Like</button>
                </p>
                <p>Added by: {user.username}</p>

                <button onClick={toggleVisibility}>Show less</button>
            </div>
            {
                 user.username === blog.user.username && deleteButton()
            }
        </div>
    );
};


export default Blog;
