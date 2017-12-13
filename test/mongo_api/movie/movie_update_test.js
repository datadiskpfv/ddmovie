require('../../common/common.js');

describe('API Movie update test', () => {

  beforeEach( (done) => {
    let data = {
      title: 'Aliens - uppppdate',    // lets correct the title
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


  it('can update a movie using an id', (done) => {
    server
      .get("/ddmovie_api/movies/search/title/a")
      .end(function (err, res) {
        assert.equal(res.body.length, 1);
        const movieId = res.body[0]._id;

        const data = {
          title: 'Aliens - update',
          movie_rating: 18,
          genre: 'Horror',
          description: 'A space horror film',
          imageName: 'aliens',
        }

        server
          .put("/ddmovie_api/movies/" + movieId)
          .send(data)
          .end(function(err, res){

            server
              .get("/ddmovie_api/movies/search/title/a")
              .end(function (err, res) {
                assert.equal(res.body[0].title, 'Aliens - update');
                done();
              });
        });
      });
  });
});