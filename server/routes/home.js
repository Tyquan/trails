const express = require('express');
const router = express.Router();
const Post = require('../models/post');
const User = require('../models/user');

// Home Page
router.get('/', (req, res, next) => {
	if (!req.session.user) {
		return res.status(400).send("You have to be logged in to view this section");
	}
	Post.find((err, data) => {
		console.log(data);
		res.render('user/home', {
			data: data
		});
	});
});

router.post('/', (req, res, next) => {
	if (!req.session.user) {
		return res.status(400).send("You have to be logged in to view this section");
	}
	let post = new Post(req.body);
	post.user = req.session.user.username;
	post.save().then((data) => {
		User.findById(req.session.user, (err, user) => {
			if (err) {
				next(err);
			} else {
				user.posts.push(data);
				user.save().then((updatedUser) => {
					req.session.user = updatedUser;
					res.redirect('home');
				}).catch((err) => {
					next(err);
				});
			}
		});
	}).catch((err) => {
		next(err);
	});
});

module.exports = router;