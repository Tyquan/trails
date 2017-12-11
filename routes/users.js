var express = require('express');
var bcrypt = require('bcrypt');
var session = require('express-session');
const saltRounds = 10;
const request = require('request');
const bitcore = require("bitcore-lib");
var User = require("../models/user");


const Block = require("../classes/block");
const BlockChain = require("../classes/blockchain");
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
	if (!req.session.user) {
	  	return res.status(400).send("You have to be logged in to view this section");
	}
	res.send('respond with a resource');
});

// Profile Page
router.get('/profile', function(req, res, next) {
	if (!req.session.user) {
		return res.status(400).send("You have to be logged in to view this section");
	}
	request({
		url: "https://blockchain.info/stats?format=json",
		json: true
	}, function(error, response, body) {
		res.render('user/profile', {
			bit: body
		});
	});
});

// Office Page
router.get('/office', function(req, res, next) {
	if (!req.session.user) {
		return res.status(400).send("You have to be logged in to view this section");
	}
	res.render('user/office');
});

// Tasks Page
router.get('/tasks', function(req, res, next) {
  if (!req.session.user) {
  	return res.status(400).send("You have to be logged in to view this section");
  }
  res.render('user/tasks');
});

// Interest Page
router.get('/interests', function(req, res, next) {
  if (!req.session.user) {
  	return res.status(400).send("You have to be logged in to view this section");
  }
  res.render('user/interests');
});

router.post("/interests", function(req, res, next){
	var interest = new Interest(req.body);
	interest.save().then(function(data){
		res.redirect('interests');
	}).catch((err) => {
		throw new Error(err);
	});
});


router.get("/bitcoin", function(req, res) {
	if (!req.session.user) {
		return res.status(400).send("You have to be logged in to view this section");
	}
	request({
		url: "https://blockchain.info/stats?format=json",
		json: true
	}, function(error, response, body) {
		res.render('user/bitcoin', {
			bit: body
		});
	});
});


// Bitcoin stuff
router.post("/wallet", (req, res) => {
	var tenzosrc = req.body.tenzosrc;
	var input = new Buffer(tenzosrc);
	var hash = bitcore.crypto.Hash.sha256(input);
	var bn = bitcore.crypto.BN.fromBuffer(hash);
	var pk = new bitcore.PrivateKey(bn).toWIF();
	var addy = new bitcore.PrivateKey(bn).toAddress();
	res.send("<h1>The Tenzo wallet of: " + tenzosrc + "</h1><br><h2><b>Your Address is:</b> " + addy + " Save it so you can send and receive Bitcoin.</h2><br><h2><b>Your PrivateKey:</b> " + pk + "</h2>");
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
			        		req.session.user = data;
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
		if(err) {
			return res.status(500).send();
		}
		if(!data) {
			return res.status(500).send();
		}
		console.log("User Found, Checking Password...");
		console.log(data);
		bcrypt.compare(body.password, data.password).then(function(reser) {
		    // res == true
		    // fin
		    req.session.user = data;
  			res.redirect('profile');
		});
	});
});

router.get('/logout', (req, res, next) => {
	req.session.user = "";
	res.render("./index");
});





module.exports = router;