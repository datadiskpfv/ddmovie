var express = require('express');
var router = express.Router();
var ctrlMovies = require('../controllers/movies');
var ctrlReviews = require("../controllers/reviews");
var ctrlUsers = require("../controllers/users");

// Movies API
//router.get('/movies', ctrlMovies.moviesList);
//router.post('/movies', ctrlMovies.moviesCreate);
//router.post('/movies/:movieid', ctrlMovies.moviesDeleteOne);
//router.get('/movies/:movieid', ctrlMovies.moviesReadOne);
//router.put('/movies/:movieid', ctrlMovies.moviesUpdateOne);
//router.get('/movies/search/:movietitle', ctrlMovies.moviesSearch);

// Reviews API
//router.get('/reviews/:movieid/', ctrlReviews.reviewsList);

//router.post('/reviews/:reviewid/reviews', ctrlReviews.reviewsCreate);
//router.put('/reviews/:reviewid/reviews/:reviewid', ctrlReviews.reviewsUpdateOne);
//router.delete('/reviews/:reviewid/reviews/:reviewid', ctrlReviews.reviewsDeleteOne);

// Users API
router.post('/users', ctrlUsers.userCreate);

router.get('/users', ctrlUsers.usersList);
router.get('/users/id/:userId', ctrlUsers.userIdReadOne);
router.get('/users/email/:emailAddress', ctrlUsers.userEmailReadOne);
router.get('/users/search/:searchString', ctrlUsers.usersSearch);

router.put('/users/:userId', ctrlUsers.userUpdateOne);

router.post('/users/:userId', ctrlUsers.userDeleteOne);

module.exports = router;