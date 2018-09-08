const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.get('/', (req, res, next) => {
	if (!req.session.user) {
		return res.status(400).send("You have to be logged in to view this section");
	}
	res.render('user/incomes', {
		data: req.session.user.incomes
	})
});

router.post('/', (req, res, next) => {
	if (!req.session.user) {
		return res.status(400).send("You have to be logged in to post a new expense");
	}
	User.findById(req.session.user._id, (err, data) => {
		if (err) {
			next(err);
		} else {
			data.incomes.push(req.body);
			data.save().then((newUserData) => {
				req.session.user = newUserData;
				res.redirect('incomes');
			}).catch((err) => {
				next(err);
			});
		}
	});
});

module.exports = router;