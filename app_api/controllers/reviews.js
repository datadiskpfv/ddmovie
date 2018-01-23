//const mongoose = require('mongoose');
//const Review = mongoose.model('review');

const Review = require('../models/review');
const util = require('util');

/********************/
/* Creating a Review */
/********************/

/* Create a review in the database */
module.exports.reviewCreate = function(req, res) {
  console.log('API reviewCreate ' + util.inspect(req.body));

  Review.create(req.body)
    .then( review => {
      console.log('Review saved to database: ' + review);
      res.status(201).json(review);
    })
    .catch( error => {
      console.log('Error in create: ' + err);
      res.status(404).json(error);
    });
};

/************************/
/* List a users reviews */
/************************/

/* returns an array of objects */
module.exports.reviewsUserIdList = function(req, res) {
  /** @param {String} req.movie.userid */
  console.log('Finding all Reviews for user with ID: ', req.params.userid);

  // make sure we have a user ID, otherwise it pointless to go on
  if (!req.params.userid) {
      console.log('No User Id');
      res.status(404).json({ "message": "No User id"});
  }

  // Using promises
  Review.find({userId: req.params.userid})
    .populate('userId')       // to get everything back (user details) remove ._id
    .populate('movieId')      // to get everything back (user details) remove ._id
    .sort('-createdOn')       // - (minus) means DESC
    .then( reviews => {       // reviews will contain any reviews found
      if(!reviews) {
        console.log('200 no reviews found');
        res.status(200).json({ "message": "no reviews found" + err });
      } else {
        console.log('200 found reviews');
        res.status(200).json(reviews);
      }
    })
    .catch( error => {
      console.log('404 error with find statement' + error);
      res.status(404).json(error);
    });
};