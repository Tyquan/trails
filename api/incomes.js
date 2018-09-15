const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.get('/', (req, res, next) => {
	if (!req.session.user) {
		return res.status(400).send("You have to be logged in to view this section");
	}
	res.status(200).json(req.session.user.incomes);
});

module.exports = router;