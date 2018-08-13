const express = require('express');
const router = express.Router();

// Tasks Page
router.get('/', function(req, res, next) {
  if (!req.session.user) {
  	return res.status(400).send("You have to be logged in to view this section");
  }
  res.render('user/tasks');
});

module.exports = router;