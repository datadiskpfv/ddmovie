const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const minlength = [10, 'minimum allowed length (10 characters).'];
const maxlength = [100, 'maximum allowed length (100 characters).'];

const reviewSchema = new Schema({
  content: {type: String, minlength: minlength, maxlength: maxlength, required: [true, 'content required']},
  rating: {type: Number, min: 1, max: 5, required: [true, 'Rating required'] },
  createdOn: {type: Date, default: Date.now},
  //movieId: {type: Schema.Types.ObjectId, ref: 'Movie'},
  userId: {type: Schema.Types.ObjectId, ref: 'user'}

});

const Review = mongoose.model('review', reviewSchema);

module.exports = Review;