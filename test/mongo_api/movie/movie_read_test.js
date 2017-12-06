const supertest = require("supertest");
const assert = require('assert');
const util = require('util');

const server = supertest.agent("http://localhost:3000");

describe('API Movie create test', () => {

  beforeEach( (done) => {
    let data = {
      title: 'Aliens - Read',
      movie_rating: 18,
      genre: 'Horror',
      description: 'A space horror film',
      imageName: 'aliens',
    }

    server
      .post("/ddmovie_api/movies")
      .send(data)
      .end(function (err, res) {
        done();
      });
  })


  it('can read all movies', (done) => {
    server
      .get("/ddmovie_api/movies")
      .end(function(err,res) {
        assert.equal(res.body[0].title, 'Aliens - Read');
        assert.equal(res.body[0].genre, 'Horror');
        done();
      });
  });

  it('can read a specific movies using an movie ID', (done) => {

    server
      .get("/ddmovie_api/movies")
      .end(function(err,res) {

        const movieId = res.body[0]._id;

        server
          .get("/ddmovie_api/movies/id/" + movieId)
          .end(function (err, res) {
            assert.equal(res.body.title, 'Aliens - Read');
            assert.equal(res.body.genre, 'Horror');
            done();
        })
      });
  });

});