const jwt = require('jsonwebtoken');
const blogsRouter = require('express').Router()
const Blog = require('../models/blog');
const User = require('../models/user');
const Comment = require('../models/Comment')

const decodeToken = async (req, res) =>{
    const decodedToken = jwt.verify(req.body.token, process.env.SECRET);
    if(!req.body.token || !decodedToken.id){
        return res.status(401).json({error: 'token missing or invalid'})
    }
    return await User.findById(decodedToken.id);
};

blogsRouter.get('/', async (req, res) => {
    const blogs = await Blog
        .find({})
        .populate('user', {username: 1, name: 1})
        .populate('comments')

    res.json(blogs.map(blog => blog.toJSON()))
});

blogsRouter.get('/:id', async (req, res) => {
    const blog = await Blog
        .findById(req.params.id)
        .populate('user', {username: 1, name: 1})
        .populate('comments')

    if(blog){
        res.json(blog.toJSON())
    } else {
        res.status(404).end();
    }
});

blogsRouter.post('/',  async(req, res) =>{
    const body = req.body;

    const user = await decodeToken(req, res);

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes === undefined ? 0 : body.likes,
        user: user._id,
        comments: body.comments === undefined ? [] : body.comments
    });

    const savedBlog = await blog.save();
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();

    res.json(savedBlog)
});

blogsRouter.delete('/:id', async (req, res) => {
    const user = await decodeToken(req, res);
    const blog = await Blog.findById(req.params.id);

    if(blog.user.toString() !== user.id)
    {
        res.status(401).json({error: 'this user is unauthorized to delete this note'});
    }

    await Blog.findByIdAndRemove(req.params.id);
    res.status(204).end();
});

blogsRouter.put('/:id', async (req, res) =>{
    const body = req.body;

    const blog = {
        author: body.author,
        title: body.title,
        url: body.url,
        likes: body.likes,
        user: body.user.id,
        comments: body.comments.map(com => com.id)
    };

    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, blog, {new: true});
    res.json(updatedBlog.toJSON());
});

blogsRouter.get('/:id/comments', async (req, res) => {
    const blog = await Blog
        .findById(req.params.id)

    const comments = blog.comments

    if(comments){
        res.json(comments.map(blog => blog.toJSON()))
    } else {
        res.status(404).end();
    }

    // const body = req.body;
    //
    // const blog = await Blog.findById(body.blog.id);
    //
    // const comment = {
    //     body: body.body.comment,
    //     blog: body.blog.id
    // }
    //
    // const savedComment = await comment.save();
    // blog.comments = blog.comments.concat(savedComment._id);
    // await blog.save();
    // res.json(savedComment)
    // // const
    //
    // const body = req.body;
    //
    // const user = await decodeToken(req, res);
    //
    // const blog = new Blog({
    //     title: body.title,
    //     author: body.author,
    //     url: body.url,
    //     likes: body.likes === undefined ? 0 : body.likes,
    //     user: user._id,
    //     comments: body.comments === undefined ? [] : body.comments
    // });
    //
    // const savedBlog = await blog.save();
    // user.blogs = user.blogs.concat(savedBlog._id);
    // await user.save();
    //
    // res.json(savedBlog)
    //

})

blogsRouter.post('/:id/comments', async (req, res) => {
    const body = req.body;

    const blog = await Blog.findById(req.params.id);

    const comment = new Comment({
        body: body.body,
        blog: req.params.id
    })

    const savedComment = await comment.save();
    blog.comments = blog.comments.concat(savedComment);
    await blog.save();
    res.json(savedComment)
})

module.exports = blogsRouter;