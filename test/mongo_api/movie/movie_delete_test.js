require('../../common/common.js');

describe('API Movie delete test', () => {

  beforeEach( (done) => {
    let data = {
      title: 'Aliens - delete',
      movie_rating: 18,
      genre: 'Horror',
      description: 'A space horror film',
      imageName: 'aliens',
    }

    server
      .post("/ddmovie_api/movies")
      .send(data)
      .end(function (err, res) { done(); })
  });


  it('can create a review adding a user id', (done) => {
    server
      .get("/ddmovie_api/movies/search/title/a")
      .end(function (err, res) {
        assert.equal(res.body.length, 1);
        const movieId = res.body[0]._id;

        server
          .post("/ddmovie_api/movies/" + movieId)
          .end(function(err, res){

            server
              .get("/ddmovie_api/movies/search/title/a")
              .end(function (err, res) {
                assert.equal(res.body.length, 0);
                done();
              });
        });
      });
  });
});