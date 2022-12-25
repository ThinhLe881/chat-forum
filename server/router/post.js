const router = require('express').Router();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const User = require('../models/user.model');
const Post = require('../models/post.model');

const verify = require('../auth/verifyToken');

// Get all posts
router.get('/home', async (req, res) => {
	try {
		const posts = await Post.find({ parentId: null }).sort({ date: -1 });
		res.status(200).send(posts);
	} catch (err) {
		res.status(400).send(err);
	}
});

// Get all user's posts
router.get('/user', verify, async (req, res) => {
	// Get user's id
	const token = req.header('auth-token');
	const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
	// Get posts
	try {
		const posts = await Post.find(
			{ parentId: null },
			{ creatorId: decodedToken.id }
		).sort({
			date: -1,
		});
		res.status(200).send(posts);
	} catch (err) {
		res.status(400).send(err);
	}
});

// Add new post
router.post('/', verify, async (req, res) => {
	// Get user's id
	const token = req.header('auth-token');
	const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
	const creatorId = decodedToken.id;
	const creatorUsername = await User.findById(creatorId).username;
	// Create a new post
	const post = new Post({
		creatorId: creatorId,
		creatorName: creatorUsername,
		content: req.body.content,
		title: req.body.title,
		image: req.body?.image,
	});
	try {
		const newPost = await post.save();
		await User.findByIdAndUpdate(
			{ _id: creatorId },
			{ $inc: { posts: 1 } }
		);
		res.status(201).send({
			post: newPost,
			msg: 'Post added successfully',
		});
	} catch (err) {
		res.status(400).send(err);
	}
});

// Update a post
router.patch('/:id', verify, async (req, res) => {
	const id = req.params.id;
	// Post's id validation
	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).send(`No document with id: ${id}`);
	}
	// Update post
	try {
		const updatedPost = await Post.findByIdAndUpdate(
			id,
			{
				content: req.body?.content,
				title: req.body?.title,
				image: req.body?.image,
			},
			{ new: true }
		);
		res.status(200).send({
			post: updatedPost,
			msg: 'Updated successfully',
		});
	} catch (err) {
		res.status(400).send(err);
	}
});

// Delete post or comment
router.delete('/:id', verify, async (req, res) => {
	const id = req.params.id;
	// Get user's id
	const token = req.header('auth-token');
	const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
	const creatorId = decodedToken.id;
	// Post's id validation
	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).send(`No document with id: ${id}`);
	}
	try {
		await Post.findByIdAndRemove(id);
		await User.findByIdAndUpdate(
			{ _id: creatorId },
			{ $inc: { posts: -1 } }
		);
		res.status(200).send('Deleted successfully');
	} catch (err) {
		res.status(400).send(err);
	}
});

module.exports = router;
