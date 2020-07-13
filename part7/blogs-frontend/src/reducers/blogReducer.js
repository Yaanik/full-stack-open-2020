import blogService from "../services/blogs"

const blogReducer = (state = [], action) =>{
    switch(action.type) {
        case 'INIT_BLOGS':
            return action.data
        case 'ADD_LIKE':
            const id = action.data.id
            const blogToLike = state.find(b => b.id === id)
            const changedBlog = {
                ...blogToLike,
                likes: blogToLike.likes + 1
            }
            return state.map(blog => blog.id !== id ? blog : changedBlog)
        case 'ADD_COMMENT':
            const blogID = action.data.blog
            const blogToComment = state.find(b => b.id === blogID)
            const newBlog = {
                ...blogToComment,
                comments: blogToComment.comments.concat(action.data)
            }
            return state.map(blog => blog.id !== blogID ? blog : newBlog);
        case 'NEW_BLOG':
            return [...state, action.data]
        case 'DELETE_BLOG':
            const blogId = action.data.id
            return state.filter(blog => blog.id !== blogId)
        default:
            return state
    }
}

export const initializeBlogs = () => {
    return async dispatch =>{
        const blogs = await blogService.getAll()
            dispatch({
            type: 'INIT_BLOGS',
            data: blogs
        })
    }
}

export const addComment = (blog, comment) =>{
    return async dispatch => {
        const newComment = await blogService.addComment(blog.id, comment)
        dispatch({
            type: 'ADD_COMMENT',
            data: newComment
        })
    }
}

export const createBlog = (blog) =>{
    return async dispatch => {
        const newBlog = await blogService.create(blog)
        dispatch({
            type: 'NEW_BLOG',
            data: newBlog
        })
    }
}

export const addLike = (blog) => {
    return async dispatch => {
        const updatedBlog = await blogService.update(
            blog.id, {...blog, likes: blog.likes + 1})
        dispatch({
            type: 'ADD_LIKE',
            data: updatedBlog
        })
    }
}

export const deleteBlog = (blog) =>{
    return async dispatch =>{
        await blogService.remove(blog.id)
        dispatch({
            type: 'DELETE_BLOG',
            data: blog
        })
    }
}

export default blogReducer