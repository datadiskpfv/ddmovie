const supertest = require("supertest");
const assert = require('assert');
const util = require('util');

const server = supertest.agent("http://localhost:3000");

describe('API User test', () => {

  it.only('can create a User', (done) => {

    let body = {
      email: 'paul.valle@datadisk.co.uk',
      password: 'password',
      role: 'admin'
    }

    server
      .post("/ddmovie_api/users")
      .send(body)
      .end(function(err, res) {
        //console.log('Res ' + res);
      })

    server
      .get("/ddmovie_api/users")
      .end(function(err, res) {
        //console.log('Body: ' + res.body[0].email);
        assert.equal(res.body[0].email, 'paul.valle@datadisk.co.uk');
        assert.equal(res.body[0].password, 'password');
        assert.equal(res.body[0].role, 'admin');
        done();
      });

  });

});