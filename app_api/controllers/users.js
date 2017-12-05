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
        res.status(200).json(users);
      }
    })
    .catch( error => {
      console.log('404 error with find statement');
      res.status(404).json(error);
    });
};

/**********************/
/* Find User by email */
/**********************/
module.exports.userEmailReadOne = function(req, res) {
  console.log('Finding One User using email:', req.params.useremail);
  if (req.params && req.params.useremail) {
    User
      .find({email: req.params.useremail})
      .exec(function(err, user) {
        if (!user) {
          res.status(404).json({ "message": "user not found" + err});
          return;
        } else if (err) {
          console.log(err);
          res.status(404).json({ "message": "user not found" + err});
          return;
        }
        res.status(200).json(user);
      });
  } else {
    console.log('No email address specified');
    res.status(404).json({ "message": "No email address in request"});
  }
};

/********************/
/* Creating a User */
/********************/

/* Create a movie in the database */
module.exports.userCreate = function(req, res) {
  console.log('API userCreate: ');
  var user = new User(req.body);

  console.log('User: ' + user);

  // look into using create, its a new and save all in one

  user.save(function(err, user) {
    if (err) {
      console.log('Error in create: ' + err);
      res.status(404).json(error);
    } else {
      console.log('User saved to database: ' + user);
      res.status(201).json(user)
    }
  });
};