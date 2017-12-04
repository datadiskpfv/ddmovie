const supertest = require("supertest");
const assert = require('assert');
const util = require('util');

const server = supertest.agent("http://localhost:3000");

describe('API User test', () => {

  it.only('can create a User', (done) => {

    let user = {
      email: 'paul.valle@datadisk.co.uk',
      password: 'password',
      role: 'admin'
    }

    server
      .post("/ddmovie_api/users")
      .send(user)
      .expect(201)      // if anything other than 201 'err' will be populated
      .end(function(err, res) {

        // check for any errors post request errors
        if (err) {
          console.log('Error: ' + err);
          done(err)       // stop the test if we have an error
        }

        // check that we got back a 201
        assert.equal(res.statusCode, 201);

        // check the user exists in mongo
        server
          .get("/ddmovie_api/users")
          .end(function (err, res) {

            // if we get any errors abort
            if (err) {
              console.log('Error: ' + err);
              done(err)
            }

            // check that user has been retrieved
            assert.equal(res.body[0].email, 'paul.valle@datadisk.co.uk');
            assert.equal(res.body[0].password, 'password');
            assert.equal(res.body[0].role, 'admin');
            done();
          });
      });
  });
});