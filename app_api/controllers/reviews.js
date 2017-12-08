var mongoose = require('mongoose');

var Review = mongoose.model('review');
var util = require('util');

/********************/
/* Creating a Review */
/********************/

/* Create a review in the database */
module.exports.reviewCreate = function(req, res) {
  console.log('API reviewCreate ' + util.inspect(req.body));
  var review = new Review(req.body);

  review.save(function(err, review) {
    if (err) {
      console.log('Error in create: ' + err);
      res.status(404).json(error);
    } else {
      console.log('Review saved to database: ' + review);
      res.status(201).json(review);
    }
  });
};

/************************/
/* List a users reviews */
/************************/

/* returns an array of objects */
module.exports.reviewsUserIdList = function(req, res) {
  console.log('Finding all Reviews for user with ID: ', req.params.userid);

  // Using promises
  Review.find({userId: req.params.userid})
    .populate('userId')       // to get everything back (user details) remove ._id
    .populate('movieId')       // to get everything back (user details) remove ._id
    .sort('-createdOn')           // - (minus) means DESC
    .then( reviews => {           // reviews will contain any reviews found
      if(!reviews) {
        console.log('404 no reviews found');
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