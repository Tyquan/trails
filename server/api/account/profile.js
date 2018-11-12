const express = require('express');
const router = express.Router();
const User = require('../../models/user');

router.get('/', (req, res, next) => {
	if (!req.session.user) {
		return res.status(400).send("You have to be logged in to view this section");
	}
	User.findById(req.session.user._id, (err, data) => {
		if (err) {
			next(err);
		} else {
			res.status(200).json(data);
		}
	});
});

module.exports = router