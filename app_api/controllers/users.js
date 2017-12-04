var mongoose = require('mongoose');

var User = mongoose.model('user');
var util = require('util');

/******************/
/* Listing Users */
/******************/

/* returns an array of objects */
module.exports.usersList = function(req, res) {
  console.log('Finding all Users (added promises)', req.params);

  // Using promises
  User.find()
    .then( users => {      // movies will contain any movies found
      if(!users) {
        console.log('404 no users found');
        res.status(200).json({ "message": "no users found" + err });
      } else {
        console.log('200 found users');
        res.status(200).json(users)
      }
    })
    .catch( error => {
      console.log('404 error with find statement');
      res.status(200).json(error)
    });
};