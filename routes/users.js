var express = require('express');
var bcrypt = require('bcrypt');
var session = require('express-session');
const saltRounds = 10;
var User = require("../models/user");
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// Profile Page
router.get('/profile', function(req, res, next) {
  res.render('user/profile');
});

// Tasks Page
router.get('/tasks', function(req, res, next) {
  res.render('user/tasks');
});

// sign a user up
router.post('/signup', function(req, res, next) {
	console.log(req.body);
	if (req.body.password == req.body.password2) {
		console.log("Password good");
		var user = new User(req.body);
		bcrypt.genSalt(saltRounds, function(err, salt) {
		    bcrypt.hash(user.password, salt)
			    .then(function(hash) {
			        // Store hash in your password DB.
			        user.password = hash;
			        console.log("Hashed");
			        user.save()
			        	.then(function(data){
			        		console.log("User saved");
			        		res.redirect('profile');
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
	console.log("Before checking anything.");
	var body = req.body;
	console.log(body);
	User.findOne({username: body.username}, function(err, data){
		console.log("User Found, Checking Password...");
		console.log(data);
		bcrypt.compare(body.password, data.password).then(function(reser) {
		    // res == true
		    // fin
  			res.redirect('profile');
		});
	});
});

module.exports = router;
