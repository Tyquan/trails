const express = require('express');
const router = express.Router();

// Interest Page
router.get('/', function(req, res, next) {
  if (!req.session.user) {
  	return res.status(400).send("You have to be logged in to view this section");
  }
  res.render('user/interests');
});

router.post("/", function(req, res, next){
	var interest = new Interest(req.body);
	interest.save().then(function(data){
		res.redirect('interests');
	}).catch((err) => {
		throw new Error(err);
	});
});

module.exports = router;