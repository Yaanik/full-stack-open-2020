const jwt = require('jsonwebtoken');
const blogsRouter = require('express').Router()
const Blog = require('../models/blog');
const User = require('../models/user');

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
    res.json(blogs.map(blog => blog.toJSON()))
});

blogsRouter.get('/:id', async (req, res) => {
    const blog = await Blog
        .findById(req.params.id)
        .populate('user', {username: 1, name: 1})

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
        user: user._id
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
        user: body.user.id
    };


    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, blog, {new: true});
    res.json(updatedBlog.toJSON());
});

module.exports = blogsRouter;