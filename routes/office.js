const express = require('express');
const router = express.Router();

// Office Page
router.get('/', (req, res, next) => {
	if (!req.session.user) {
		return res.status(400).send("You have to be logged in to view this section");
	}
	res.render('user/finance/office');
});

module.exports = router;