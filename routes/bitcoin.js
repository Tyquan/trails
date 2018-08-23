const express = require('express');
const router = express.Router();
const request = require('request');
const bitcore = require("bitcore-lib");

const Block = require("../classes/block");
const BlockChain = require("../classes/blockchain");
const BitcoinModel = require('../models/bitcoin');

router.get("/", function(req, res) {
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

router.get("/mydata", (req, res, next) => {
	BitcoinModel.find((err, data) => {
		if (err) {
			next(err);
		} else {
			res.status(200).json(data);
		}
	});
});

router.post("/", (req, res) => {
	var tenzosrc = req.body.tenzosrc;
	var input = new Buffer(tenzosrc);
	var hash = bitcore.crypto.Hash.sha256(input);
	var bn = bitcore.crypto.BN.fromBuffer(hash);
	var pk = new bitcore.PrivateKey(bn).toWIF();
	var addy = new bitcore.PrivateKey(bn).toAddress();
	res.send("<h1>The Tenzo wallet of: " + tenzosrc + "</h1><br><h2><b>Your Address is:</b> " + addy + " Save it so you can send and receive Bitcoin.</h2><br><h2><b>Your PrivateKey:</b> " + pk + "</h2>");
});

module.exports = router;