var express = require('express');
var router = express.Router();
var ctrlMovies = require('../controllers/movies');
var ctrlReviews = require("../controllers/reviews");
var ctrlUsers = require("../controllers/users");

// Movies API
router.post('/movies', ctrlMovies.movieCreate);

router.get('/movies', ctrlMovies.moviesList);
router.get('/movies/search/title/:searchString', ctrlMovies.moviesTitleSearch);
router.get('/movies/search/genre/:searchString', ctrlMovies.moviesGenreSearch);
router.get('/movies/search/populate/:searchString', ctrlMovies.moviesPopulateSearch);
router.get('/movies/id/:movieid', ctrlMovies.moviesReadOne);

//router.put('/movies/:movieid', ctrlMovies.moviesUpdateOne);
router.put('/movies/review/:movieId', ctrlMovies.movieAddReview);

router.post('/movies/:movieid', ctrlMovies.moviesDeleteOne);

// Reviews API
router.post('/reviews/', ctrlReviews.reviewCreate);

router.get('/reviews/userid/:userid/', ctrlReviews.reviewsUserIdList);
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