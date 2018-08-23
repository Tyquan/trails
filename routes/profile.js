const express = require('express');
const router = express.Router();
const request = require('request');

// Profile Page
router.get('/', (req, res, next) => {
	// if (!req.session.user) {
	// 	return res.status(400).send("You have to be logged in to view this section");
	// }
	request({
		url: "https://blockchain.info/stats?format=json",
		json: true
	}, (error, response, body) => {
		res.render('user/profile', {
			bit: body
		});
	});
});

module.exports = router;