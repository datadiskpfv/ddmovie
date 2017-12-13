const {server, assert, util} = require('../../common/common');

describe('API Movie create test', () => {

  it('can create a review adding a user id', (done) => {

    let data = {
      title: 'Aliens - create',
      movie_rating: 18,
      genre: 'Horror',
      description: 'A space horror film',
      imageName: 'aliens',
      reviews: []
    }

    server
      .post("/ddmovie_api/movies")
      .send(data)
      .end(function (err, res) {
        done();
      })
  })

});