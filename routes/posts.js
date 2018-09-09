const express = require('express');
const router = express.Router();
const Post = require('../models/post');

// router.get('/', (req, res, next) => {
// 	if (!req.session.user) {
// 	  	return res.status(400).send("You have to be logged in to view this section");
// 	}
// 	res.render(, {
// 		data: req.session.user.posts
// 	})
	
// });

router.post('/', (req, res, next) => {
	User.findById(req.session.user._id, (err, data) => {
		if (err) {
			next(err);
		} else {
			data.posts.push(req.body);
			data.save().then((newUserData) => {
				req.session.user = newUserData;
				let post = new Post(req.body);
				post.save().then((data) => {
					res.redirect('posts');
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