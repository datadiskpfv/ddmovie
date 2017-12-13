const mongoose = require('mongoose');
require('../../common/common.js');

describe('API Complete test', () => {

  beforeEach ( (done) => {

    let userId, movieId, reviewId;

    // create a movie
    let movie_data = {
      title: 'Aliens - Complete',
      movie_rating: 18,
      genre: 'Horror',
      description: 'A space horror film',
      imageName: 'aliens',
    }

    server
      .post("/ddmovie_api/movies")
      .send(movie_data)
      .end(function (err, res) {

        movieId = res.body._id;

        // create a user
        let user_data = {
          email: 'paul.valle@datadisk.co.uk',
          password: 'completetest',
          role: 'admin'
        }

        server
          .post("/ddmovie_api/users")
          .send(user_data)
          .end(function(err, res) {

            userId = res.body._id;

            // create a review
            let review_data = {
              content: 'Complete test of movie, user and review',
              rating: 5,
              userId: mongoose.Types.ObjectId(userId),
              movieId: mongoose.Types.ObjectId(movieId)
            }

            server
              .post("/ddmovie_api/reviews")
              .send(review_data)
              .end(function (err, res) {

                reviewId = res.body._id;

                // update movie with review ID
                let movie_update_data = {
                  reviewId: mongoose.Types.ObjectId(reviewId),
                }

                server
                  .put("/ddmovie_api/movies/review/" + movieId)
                  .send(movie_update_data)
                  .end(function(err, res){

                    //console.log('Movie ID: ' + movieId);
                    //console.log('User ID: ' + userId);
                    //console.log('Review ID: ' + reviewId);
                    //console.log('Updated: ' + res.body.title);

                    done();
                  });
              });
          });
      });
  });

  it.only('can perform a COMPLETE test of creating a movie, user and a review', (done) => {

    server
      .get("/ddmovie_api/movies/search/populate/a")
      .end(function(err,res){
        console.log('RES: ' + util.inspect(res.body, false, 4));

        // movie test
        assert.equal(res.body[0].title, 'Aliens - Complete');
        assert.equal(res.body[0].genre, 'Horror');

        // movie review test
        assert.equal(res.body[0].reviews[0].content, 'Complete test of movie, user and review');
        assert.equal(res.body[0].reviews[0].rating, 5);

        // movie review user test
        assert.equal(res.body[0].reviews[0].userId.email, 'paul.valle@datadisk.co.uk');
        assert.equal(res.body[0].reviews[0].userId.role, 'admin');
        done();
      })
  })
});