"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePost = exports.updatePost = exports.getPostById = exports.createPost = exports.getPosts = void 0;
const post_1 = require("../models/post");
const user_1 = require("../models/user");
const getPosts = async (req, res) => {
    try {
        const posts = await post_1.Post.find();
        res.json(posts);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getPosts = getPosts;
const createPost = async (req, res) => {
    const { title, content } = req.body;
    const files = req.files;
    const userId = req.user?.userId;
    try {
        const user = await user_1.User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const filePaths = files.map(file => file.path);
        const post = new post_1.Post({ title, content, author: user._id, files: filePaths });
        await post.save();
        user.posts.push(post._id);
        await user.save();
        res.status(201).json(post);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.createPost = createPost;
const getPostById = async (req, res) => {
    try {
        const post = await post_1.Post.findById(req.params.id);
        if (post == null) {
            return res.status(404).json({ message: 'Cannot find post' });
        }
        res.json(post);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getPostById = getPostById;
const updatePost = async (req, res) => {
    try {
        const post = await post_1.Post.findById(req.params.id);
        if (post == null) {
            return res.status(404).json({ message: 'Cannot find post' });
        }
        if (req.body.title != null) {
            post.title = req.body.title;
        }
        if (req.body.content != null) {
            post.content = req.body.content;
        }
        const updatedPost = await post.save();
        res.json(updatedPost);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.updatePost = updatePost;
const deletePost = async (req, res) => {
    try {
        const post = await post_1.Post.findById(req.params.id);
        if (post == null) {
            return res.status(404).json({ message: 'Cannot find post' });
        }
        await post.deleteOne({ _id: post._id });
        res.json({ message: 'Deleted post' });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.deletePost = deletePost;
