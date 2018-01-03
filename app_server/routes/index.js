var express = require('express');
var router = express.Router();
var ctrlMovies = require('../controllers/movies');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* Login Page */
router.get('/login', ctrlMovies.movieLogin);

module.exports = router;
