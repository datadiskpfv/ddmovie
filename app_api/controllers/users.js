const mongoose = require('mongoose');

const User = mongoose.model('user');
//const util = require('util');

/******************/
/* List All Users */
/******************/

/* returns an array of objects */
module.exports.usersList = function(req, res) {
  console.log('Finding all Users (added promises)', req.params);

  // Using promises
  User.find()
    .sort('email')
    .then( users => {      // users will contain any users found
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
  /** @param {String} req.params.emailAddress */
  console.log('Finding One User using email:', req.params.emailAddress);
  if (req.params && req.params.emailAddress) {
    User
      .find({email: req.params.emailAddress})
      .sort('email')
      .then(user => {
        if (!user) {
          res.status(404).json({"message": "user not found" + err});
        } else  {
          res.status(200).json(user);
        }
      })
      .catch(error => {
        console.log('ERROR: ' + error);
        res.status(404).json({"message": "Error: " + error});
      });
  } else {
    console.log('No email address specified');
    res.status(404).json({"message": "No email address in request"});
  }
};

/****************************************/
/* Searching for a User (search string) */
/****************************************/
module.exports.usersSearch = function(req, res) {
  console.log('Find User ', req.params.searchString);

  // Using promises
  User.find({email: {"$regex": req.params.searchString, $options: "i"}})
    .sort('email')
    .then( users => {      // users will contain any users found
      if(!users) {
        console.log('404 no users found');
        res.status(404).json({ "message": "No users found"});
      } else {
        console.log('200 found users');
        res.status(200).json(users)
      }
    })
    .catch( error => {
      console.log('404 error with search statement');
      res.status(404).json(error)
    });
};

/********************************/
/* Searching for a User (id) */
/********************************/
module.exports.userIdReadOne = function(req, res) {
  console.log('Find User ', req.params.userId);

  // Using promises
  User.findById(req.params.userId)
    .then( users => {      // users will contain any users found
      if(!users) {
        console.log('404 no users found');
        res.status(404).json({ "message": "No users found"});
      } else {
        console.log('200 found users');
        res.status(200).json(users)
      }
    })
    .catch( error => {
      console.log('404 error with search statement');
      res.status(404).json(error)
    });
};

/********************/
/* Creating a User */
/********************/

/* Create a user in the database */
module.exports.userCreate = function(req, res) {
  console.log('API userCreate: ');
  console.log('User: ' + req.body);

  User.create(req.body)
    .then( user => {
      console.log('User saved to database: ' + user);
      res.status(201).json(user);
    })
    .catch( error => {
      console.log('Error in create: ' + error);
      res.status(404).json(error);
    });
};

/********************/
/* Deleting a User */
/********************/

/* Delete a user in the database, must pass in an ID */
module.exports.userDeleteOne = function(req, res) {
  console.log('User ID: ' + req.params.userId);

  const userid = req.params.userId;

  if (userid) {
    User
      .findByIdAndRemove(userid)
      .then( () => {
        console.log('User deleted');
        res.status(204).json();
      })
      .catch( error => {
        console.log('ERROR: ' + error);
        res.status(404).json(error);
      });
  } else {
    console.log('No User Id');
    res.status(404).json({ "message": "No userid"});
  }
};

/********************/
/* Updating a user */
/********************/

module.exports.userUpdateOne = function(req, res) {

  console.log('Updating User');

  // make sure we have a user ID, otherwise it pointless to go on
  if (!req.params.userId) {
    console.log('No User Id');
    res.status(404).json({ "message": "No User id"});
  }

  User.findByIdAndUpdate(req.params.userId, req.body)
    .then( user => {
      console.log('User updated ' + user.email);
      res.status(200).json(user);
    })
    .catch( error => {
      res.status(404).json({"message": "user not found or update failed " + error});
    })
};