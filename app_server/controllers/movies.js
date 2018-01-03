/**************/
/* User Login */
/**************/
module.exports.movieLogin = function(req, res) {
  console.log('Login as: ');

  res.render('login', {
    title: 'login'
  });
};