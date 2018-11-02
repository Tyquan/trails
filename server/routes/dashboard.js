const express = require('express');
const router = express.Router();
const request = require('request');
const bitcore = require("bitcore-lib");

const BitcoinModel = require('../models/bitcoin');

router.get("/", function(req, res) {
	if (!req.session.user) {
		return res.status(400).send("You have to be logged in to view this section");
	}

	let userIncomes = req.session.user.incomes;
	let incomeTotal = 0;
	for (let i = 0; i < req.session.user.incomes.length; i++) {
		incomeTotal += req.session.user.incomes[i].amount;
	}

	let expenseTotal = 0;
	for (let i = 0; i < req.session.user.expenses.length; i++) {
		expenseTotal += req.session.user.expenses[i].amount;
	}

	let swimResult = incomeTotal - expenseTotal;

	res.render('user/dashboard', {
		incomes: req.session.user.incomes,
		expenses: req.session.user.expenses,
		incomeTotal: incomeTotal,
		expenseTotal: expenseTotal,
		swimResult: swimResult
	});
});

module.exports = router;