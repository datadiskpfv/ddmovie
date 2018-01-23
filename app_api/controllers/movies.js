// noinspection NpmUsedModulesInstalled
const mongoose = require('mongoose');

let Movie = mongoose.model('movie');
const util = require('util');

/********************/
/* Creating a Movie */
/********************/
module.exports.movieCreate = function(req, res) {
  console.log('API movieCreate post data: ' + util.inspect(req.body));

  Movie.create(req.body)
    .then( movie => {
      console.log('Movie saved to database: ' + movie);
      res.status(201).json(movie);
    })
    .catch( error => {
      console.log('Error in create: ' + error);
      res.status(400).json(error);
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
      if (movies) {
        console.log('200 found movies');
        res.status(200).json(movies);
      } else {
        console.log('404 no movies found');
        res.status(404).json({"message": "no movies found" + err})
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
  /** @param {String} req.movie.movieid */
  console.log('Finding One Movie using ID:', req.params.movieid);

  if (req.params.movieid) {
    Movie
      .findById(req.params.movieid)
      .then( movie => {      // will only return one movie if found
        console.log('200 found movie');
        res.status(200).json(movie);
      })
      .catch( error => {
        console.log('404 error with find statement');
        res.status(404).json(error);
      });
  } else {
    console.log('No movie ID specified');
    res.status(404).json({ "message": "No movie ID in request" })
  }
};

/****************************************************/
/* Searching for Movie titles using a search string */
/****************************************************/
module.exports.moviesTitleSearch = function(req, res) {
  /** @param {String} req.movie.searchString */
  console.log('Find Movies with title', req.params.searchString);

  // make sure we have a search string, otherwise it pointless to go on
  if (!req.params.searchString) {
      console.log('No search string for title');
      res.status(404).json({ "message": "No search string for title"});
  }

  Movie.find({title: {"$regex": req.params.searchString, $options: "i"}})
    .then( movie => {      // movies will contain any movies found
      if (movie) {
        console.log('200 found movie');
        res.status(200).json(movie);
      } else {
        console.log('404 no movies found');
        res.status(404).json({"message": "no movies found" + err});
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

  // make sure we have a search string, otherwise it pointless to go on
  if (!req.params.searchString) {
      console.log('No search string for genere');
      res.status(404).json({ "message": "No search string for genre"});
  }

  Movie.find({genre: {"$regex": req.params.searchString, $options: "i"}})
    .then( movie => {      // movies will contain any movies found
      if (movie) {
        console.log('200 found movie');
        res.status(200).json(movie);
      } else {
        console.log('404 no movies found');
        res.status(404).json({"message": "no movies found" + err})
      }
    })
    .catch( error => {
      console.log('404 error with search statement');
      res.status(404).json(error);
    });
};

/****************************************************/
/* Searching for Movie titles and populating */
/****************************************************/
module.exports.moviesPopulateSearch = function(req, res) {
  console.log('Find Movies with title and populating', req.params.searchString);

  // make sure we have a search string, otherwise it pointless to go on
  if (!req.params.searchString) {
    console.log('No search string for title');
    res.status(404).json({ "message": "No search string for title"});
  }

  Movie.find({title: {"$regex": req.params.searchString, $options: "i"}})
    .populate({
      path : 'reviews',
      populate : { path: 'userId'}
    })
    .sort('title')
    .then( movie => {      // movies will contain any movies found
      if (movie) {
        console.log('200 found movie: ' + movie);
        res.status(200).json(movie);
      } else {
        console.log('404 no movies found');
        res.status(404).json({"message": "no movies found" + err});
      }
    })
    .catch( error => {
      console.log('404 error with search statement');
      res.status(404).json(error);
    });
};

/******************************/
/* Adding a review to a Movie */
/******************************/
module.exports.movieAddReview = function(req, res) {
  // first we get the movie object using the ID, then update the movie object and then save it back to the DB
  // the new returns a updated movie back to the calling callback
  if (req.params.movieId) {
    Movie
      .findByIdAndUpdate(req.params.movieId, {$push: {reviews: req.body.reviewId}}, {'new': true})
      .then(movie => {
        console.log('Movie Review Updated: ' + movie);
        res.status(200).json(movie);
      })
      .catch(error => {
        console.log('Add Review Error or movie not found ' + error);
        res.status(404).json(err);
      })
  } else {
    res.status(404).json({"message": "Not found, movie ID is required" });
  }
};

/********************/
/* Updating a Movie */
/********************/
module.exports.moviesUpdateOne = function(req, res) {

  if (req.params.movieId) {
    Movie.findByIdAndUpdate(req.params.movieId, req.body)
      .then(movie => {
        console.log('Movie updated ' + movie.title);
        res.status(200).json(movie);
      })
      .catch(error => {
        console.log('Movie NOT updated ' + error);
        res.status(404).json(error);
      })
  } else {
    res.status(404).json({"message": "Not found, movie ID is required" });
  }
};

/********************************/
/* Deleting a Movie using an ID */
/********************************/
module.exports.moviesDeleteOne = function(req, res) {
  console.log('Movie ID: ' + req.params.movieid);

  if (req.params.movieid) {
    Movie
      .findByIdAndRemove(req.params.movieid)
      .then( () => {
        console.log('Movie deleted');
        res.status(200).json()
      })
      .catch ( error => {
        console.log('404 error with movie delete statement');
        res.status(404).json(error);
      })

  } else {
    res.status(404).json({ "message": "No movie ID" });
  }
};