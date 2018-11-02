var express = require('express');
var User = require("../models/user");
var router = express.Router();

/* GET users listing. */
router.get('/:id', function(req, res, next) {
	if (!req.session.user) {
	  	return res.status(400).send("You have to be logged in to view this section");
	}
	console.log(req.params.id);
	User.findById(req.params.id,(err, data) => {
		if (err) {
			next(err);
		} else {
			console.log(data);
			res.render('user/profile', {
				user: data
			});
		}
	});
});

module.exports = router;