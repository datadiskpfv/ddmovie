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

/****************************************************/
/* Searching for Movie titles using a search string */
/****************************************************/
module.exports.moviesTitleSearch = function(req, res) {
  console.log('Find Movies with title', req.params.searchString);

  Movie.find({title: {"$regex": req.params.searchString, $options: "i"}})
    .then( movie => {      // movies will contain any movies found
      if(!movie) {
        console.log('404 no movies found');
        res.status(404).json({ "message": "no movies found" + err })
      } else {
        console.log('200 found movie');
        res.status(200).json(movie)
      }
    })
    .catch( error => {
      console.log('404 error with search statement');
      res.status(404).json(error);
    });
};

/****************************************************/
/* Searching for Movie genres using a search string */
/****************************************************/
module.exports.moviesGenreSearch = function(req, res) {
  console.log('Find Movies with title', req.params.searchString);

  Movie.find({genre: {"$regex": req.params.searchString, $options: "i"}})
    .then( movie => {      // movies will contain any movies found
      if(!movie) {
        console.log('404 no movies found');
        res.status(404).json({ "message": "no movies found" + err })
      } else {
        console.log('200 found movie');
        res.status(200).json(movie)
      }
    })
    .catch( error => {
      console.log('404 error with search statement');
      res.status(404).json(error);
    });
};

/********************/
/* Updating a Movie */
/********************/

/* Update a movie */
module.exports.moviesUpdateOne = function(req, res) {
  // make sure we have a movie ID, otherwise it pointless to go on
  if (!req.params.movieid) {
    res.status(404).json({"message": "Not found, movieid is required" });
  }

  // first we get the movie object using the ID, then update the movie object and then save it back to the DB
  Movie
    .findById(req.params.movieid)
    .select('-reviews -avgReviewRating')         // everything but reviews
    .exec(
      function(err, movie) {
        if (!movie) {
          res.status(404).json({"message": "Movie not found" });
        } else if (err) {
          res.status(404).json(err);
        }

        movie.title = req.body.title;
        movie.movie_rating = req.body.movie_rating;
        movie.genre = req.body.genre;
        movie.description = req.body.description;
        movie.imageName = req.body.imageName;

        movie.save(function(err, movie) {
          if (err) {
            console.log('Movie NOT updated');
            res.status(404).json(err);
          } else {
            console.log('Movie updated');
            res.status(200).json(movie);
          }
        });
      }
    );
};














/********************************/
/* Deleting a Movie using an ID */
/********************************/

module.exports.moviesDeleteOne = function(req, res) {
  console.log('Movie ID: ' + req.params.movieid);

  var movieid = req.params.movieid;

  if (movieid) {
    Movie
      .findByIdAndRemove(movieid)
      .then( () => {
        console.log('Movie deleted');
        res.status(200).json()
      })
      .catch ( error => {
        console.log('404 error with movie delete statement');
        res.status(404).json(error);
      })

  } else {
    res.status(404).json({ "message": "No movieid" });
  }
};