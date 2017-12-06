const supertest = require("supertest");
const assert = require('assert');
const util = require('util');

const server = supertest.agent("http://localhost:3000");

describe('API Review create test', () => {

  let userId;

  beforeEach( (done) => {
    // first create a user
    server
      .post("/ddmovie_api/users")
      .send({email: 'paul.valle@datadisk.co.uk', password: 'reviewCreate', role: 'admin'})
      .end(function (err, res) {

        server
          .get("/ddmovie_api/users/email/paul.valle@datadisk.co.uk")
          .end(function (err, res) {
            userId = res.body[0]._id;
            done();
          });
      });
  });

  it('can create a review adding a user id', (done) => {

    let data = {
      content: 'First review testing the create process',
      rating: 5,
      userId: userId
    }

    server
      .post("/ddmovie_api/reviews")
      .send(data)
      .end(function (err, res) {
        done();
      })
  })

});