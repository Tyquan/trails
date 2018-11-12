const express = require('express');
const router = express.Router();
const User = require('../../models/user');
const Post = require('../../models/post');

router.get('/myposts', (req, res, next) => {
	if (!req.session.user) {
		return res.status(400).send("You have to be logged in to view this section");
	}
	res.status(200).json(req.session.user.posts);
});

router.get('/allposts', (req, res, next) => {
	if (!req.session.user) {
		return res.status(400).send("You have to be logged in to view this section");
	}
	Post.find((err, data) => {
		if (err) {
			throw err;
		} else {
			res.status(200).json(data);
		}
	});
});

router.post('/', (req, res, next) => {
	if (!req.session.user) {
		return res.status(400).send("You have to be logged in to post a new expense");
	}
	User.findById(req.session.user._id, (err, data) => {
		if (err) {
			next(err);
		} else {
			req.body.username = req.session.user.username;
			req.body.displayName = req.session.user.displayName;
			req.body.imageUrl = req.session.user.imageUrl;
			data.posts.push(req.body);
			data.save().then((newUserData) => {
				// save globally
				let post = new Post(req.body);
				post.save().then((datas)=> {
					req.session.user = newUserData;
					res.satus(200).json(req.session.user);
				}).catch((err) => {
					next(err);
				});
			}).catch((err) => {
				next(err);
			});
		}
	});
});

module.exports = router;