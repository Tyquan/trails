var express = require('express');
var bcrypt = require('bcrypt');
var session = require('express-session');
const saltRounds = 10;
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
  res.render('user/profile');
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

router.get("/blocks", function(req, res) {
	if (!req.session.user) {
		return res.status(400).send("You have to be logged in to view this section");
	}
	var blockchain = req.session.user.blocks;
	res.send(blockchain);
});

router.post('/mineblock', (req, res) => {
	let counter = 1;
	let newBlock = new BlockChain(counter, Date.now, req.body.data);
    //let newBlock = BlockChain.addBlock(req.body.data);
    //req.session.user.blocks.push(JSON.stringify(newBlock));
    console.log('block added: ' + JSON.stringify(newBlock));
    //res.send('block added: ' + JSON.stringify(newBlock));
    counter++;
    res.redirect('blocks');
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