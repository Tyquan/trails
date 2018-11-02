const express = require('express');
const router = express.Router();
const Job = require('../models/job');
const User = require('../models/user');

router.get('/', (req, res) => {
	if (!req.session.user) {
		return res.status(400).send("You have to be logged in to view this section");
	} else {
		res.render('user/jobs/all', {
			data: req.session.user.jobs
		});
	}
});