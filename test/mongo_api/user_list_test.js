const supertest = require("supertest");
//const assert = require('assert');
const util = require('util');

const server = supertest.agent("http://localhost:3000");

describe('API User test', () => {

  it('can list a Users details', (done) => {

    let body = {
      email: 'paul.valle@datadisk.co.uk',
      password: 'password',
      role: 'admin'
    }

    server
      .get("/ddmovie_api/users")
      .send(body)
      .end(function(err, res) {
        console.log('Res ' + res.body.test);
        done();
      })

  });

});