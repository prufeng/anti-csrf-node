var express = require('express');
var router = express.Router();

const users = [];
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('user', { title: 'User', users: users });
});

/* Add user */
router.post('/', (req, res, next) => {
  users.push(req.body.userName);
  res.render('user', { title: 'User', users: users });
});

module.exports = router;
