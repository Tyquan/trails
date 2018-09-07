const express = require('express');
const router = express.Router();
const Expense = require('../models/expense')

router.get('/', (req, res, next) => {
	if (!req.session.user) {
		return res.status(400).send("You have to be logged in to view this section");
	}
	Expense.find((err, data) => {
		if (err) {
			next(err);
		} else {
			res.render('user/expenses', {
				data: data
			})
		}
	});
});

router.post('/', (req, res, next) => {
	if (!req.session.user) {
		return res.status(400).send("You have to be logged in to post a new expense");
	}
	let expense = new Expense(req.body);
	expense.author = req.session.user;
	expense.save().then((data) => {
		res.redirect('expenses');
	}).catch((err) => {
		next(err);
	});
});

module.exports = router;