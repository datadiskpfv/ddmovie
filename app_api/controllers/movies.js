var mongoose = require('mongoose');

var Movie = mongoose.model('movie');
var util = require('util');

/********************/
/* Creating a Movie */
/********************/
module.exports.movieCreate = function(req, res) {
  console.log('API movieCreate post data: ' + util.inspect(req.body));
  var movie = new Movie(req.body);

  // look into using create, its a new and save all in one
  movie.save(function(err, movie) {
    if (err) {
      console.log('Error in create: ' + err);
      res.status(400).json(err);
    } else {
      console.log('Movie saved to database: ' + movie);
      res.status(201).json(err);
    }
  });
};

/******************/
/* Listing Movies */
/******************/

/* returns an array of objects */
module.exports.moviesList = function(req, res) {
  console.log('Finding all Movies (added promises)', req.params);

  // Using promises
  Movie.find()
    .then( movies => {      // movies will contain any movies found
      if(!movies) {
        console.log('404 no movies found');
        res.status(404).json({ "message": "no movies found" + err })
      } else {
        console.log('200 found movies');
        res.status(200).json(movies)
      }
    })
    .catch( error => {
      console.log('404 error with find statement');
      res.status(404).json(error);
    });
};

/****************************/
/* Retrieving a Movie by ID */
/****************************/
/* returns a single object */
module.exports.moviesReadOne = function(req, res) {
  console.log('Finding One Movie using ID:', req.params.movieid);
  if (req.params && req.params.movieid) {
    Movie
      .findById(req.params.movieid)
      .then( movie => {      // movies will contain any movies found
        if(!movie) {
          console.log('404 no movies found');
          res.status(404).json({ "message": "no movie found" + err })
        } else {
          console.log('200 found movie');
          res.status(200).json(movie)
        }
      })
      .catch( error => {
        console.log('404 error with find statement');
        res.status(404).json(error);
      });
  } else {
    console.log('No id specified');
    res.status(404).json({ "message": "No id in request" })
  }
};