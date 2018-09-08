var express = require('express');
var bcrypt = require('bcrypt');
var session = require('express-session');
const saltRounds = 10;
var User = require("../models/user");
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
	if (!req.session.user) {
	  	return res.status(400).send("You have to be logged in to view this section");
	}
	res.send('respond with a resource');
});

// sign a user up
router.post('/signup', function(req, res, next) {
	console.log(req.body);
	if (req.body.password == req.body.password2) {
		var user = new User(req.body);
		bcrypt.genSalt(saltRounds, function(err, salt) {
		    bcrypt.hash(user.password, salt)
			    .then(function(hash) {
			        // Store hash in your password DB.
			        user.password = hash;
			        user.save()
			        	.then(function(data){
			        		req.session.user = data;
			        		res.redirect('/home');
			        	})
			        	.catch(function(err){
			    			console.log(err);
			    			res.redirect('/signup');
			    		});
			    })
			    .catch(function(err){
			    	console.log(err);
			    	res.redirect('/signup');
			    });
		});
	} else {
		res.redirect('/signup');
	}
});

// log a user in
router.post('/login', function(req, res, next) {
	var body = req.body;
	User.findOne({username: body.username}, function(err, data){
		if(err) {
			return res.status(500).send();
		}
		if(!data) {
			return res.status(500).send();
		}
		bcrypt.compare(body.password, data.password).then(function(reser) {
		    // res == true
		    // fin
		    req.session.user = data;
  			res.redirect('/home');
		});
	});
});

router.get('/logout', (req, res, next) => {
	req.session.user = "";
	res.render("./index");
});





module.exports = router;