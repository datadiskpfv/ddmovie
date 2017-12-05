const supertest = require("supertest");
const assert = require('assert');
const util = require('util');

const server = supertest.agent("http://localhost:3000");

describe('API User list test', () => {

  beforeEach( (done) => {
    server
      .post("/ddmovie_api/users")
      .send({email: 'paul.valle@datadisk.co.uk', password: 'password99', role: 'admin'})
      .end(function(err, res) {});

    server
      .post("/ddmovie_api/users")
      .send({email: 'lorraine.valle@datadisk.co.uk', password: 'password88', role: 'user'})
      .end(function(err, res) {} );

    done();
  });

  it('can list all Users', (done) => {
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
        assert.equal(res.body[0].password, 'password99');
        assert.equal(res.body[0].role, 'admin');

        // check that user has been retrieved
        assert.equal(res.body[1].email, 'lorraine.valle@datadisk.co.uk');
        assert.equal(res.body[1].password, 'password88');
        assert.equal(res.body[1].role, 'user');
        done();
      });
  });

  it.only('can list a specific user by using an email address', (done) => {
    server
      .get("/ddmovie_api/users/paul.valle@datadisk.co.uk/email")
      .end(function (err, res) {
        console.log('RES: ' + util.inspect(res.body));
        done();
      });
  });

});