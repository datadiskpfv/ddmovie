const supertest = require("supertest");
const assert = require('assert');
const util = require('util');

const server = supertest.agent("http://localhost:3000");

describe('API Review create test', () => {

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
              userId: userId,
              movieId: movieId
            }

            server
              .post("/ddmovie_api/reviews")
              .send(review_data)
              .end(function (err, res) {

                reviewId = res.body._id;

                // update movie with review ID
                let movie_update_data = {
                  reviewId: reviewId,
                }

                server
                  .put("/ddmovie_api/movies/review/" + movieId)
                  .send(movie_update_data)
                  .end(function(err, res){

                    console.log('Movie ID: ' + movieId);
                    console.log('User ID: ' + userId);
                    console.log('Review ID: ' + reviewId);
                    console.log('Updated: ' + res.body.title);

                    done();
                  });
              });
          });
      });
  });

  it('can perform a COMPLETE test of creating a movie, user and a review', (done) => {

    // http://127.0.0.1:3000/ddmovie_api/movies/search/populate/a
    done();
  })

});