const supertest = require("supertest");
const assert = require('assert');
const util = require('util');

const server = supertest.agent("http://localhost:3000");

describe('API Review read test', () => {

  // We need a user created and then a review before we can test
  beforeEach( (done) => {
    // first create a user
    server
      .post("/ddmovie_api/users")
      .send({email: 'paul.valle@datadisk.co.uk', password: 'reviewCreate', role: 'admin'})
      .end(function (err, res) {

        // need to get user ID for the review
        server
          .get("/ddmovie_api/users/email/paul.valle@datadisk.co.uk")
          .end(function (err, res) {

            // now lets create a review using the user id
            let data = {
              content: 'First review testing the create process',
              rating: 5,
              userId: res.body[0]._id,
              createdOn: Date.now() + -5*24*3600*1000  // 5 days ago
            };

            server
              .post("/ddmovie_api/reviews")
              .send(data)
              .end(function (err, res) {});

            // now lets create a review using the user id
            data = {
              content: 'Second review testing the create process',
              rating: 4,
              userId: res.body[0]._id
            };

            server
              .post("/ddmovie_api/reviews")
              .send(data)
              .end(function (err, res) {
                done();
              });
          });
      });
  });

  it('can retrieve a specific users reviews', (done) => {

    server
      .get("/ddmovie_api/users/email/paul.valle@datadisk.co.uk")
      .end(function (err, res) {

        const userId = res.body[0]._id;
        server
          .get("/ddmovie_api/reviews/userid/" + userId)
          .end(function (err,res) {

            assert.equal(res.body[0].content, 'Second review testing the create process');
            assert.equal(res.body[1].content, 'First review testing the create process');
            assert.equal(res.body.length, 2);
            done();
          });
      });
  })

});