const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const minlength = [10, 'minimum allowed length (50 characters).'];
const maxlength = [150, 'maximum allowed length (150 characters).'];

const movieSchema = new Schema({
  title: {type: String, required: [true, 'Title is required']},
  movie_rating: {type: String, enum: ['U', 'PG', '12', '15', '18'], required: [true, 'Movie Rating is required']},
  genre: {type: String, required: [true, 'Genre is required']},
  description: {type: String, minlength: minlength, maxlength: maxlength, required: [true, 'Description is required']},
  imageName: {type: String, required: [true, 'Image Name is required']},
  avgReviewRating: {type: Number, default: 0},
  reviews: [{type: Schema.Types.ObjectId, ref: 'review'}]
});

// model name, schema, mongo db collection name (optional)
// If you exclude the collection name Mongoose will use a lowercase pluralized version of the model name
//
// mongoose.model('Location', locationSchema, 'Locations');

const Movie = mongoose.model('movie', movieSchema);

module.exports = Movie;

// use the below to inspect the mongoose singleton
//
//console.log('Default: ' + util.inspect(mongoose, {depth: 3}));