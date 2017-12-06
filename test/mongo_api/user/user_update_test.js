const supertest = require("supertest");
const assert = require('assert');
const util = require('util');

const server = supertest.agent("http://localhost:3000");

describe('API User update test', () => {

  beforeEach((done) => {
    server
      .post("/ddmovie_api/users")
      .send({email: 'paul.valle@datadisk.co.uk', password: 'update', role: 'admin'})
      .end(function (err, res) {done();});
  });

  it('can update a specific user', (done) => {

    // because its all async we have to nest each test to make sure
    // that the task has completed before moving onto the next task

    server
      .get("/ddmovie_api/users/email/paul.valle@datadisk.co.uk")
      .end(function (err, res) {
        //console.log('User ID: ' + res.body[0]._id);
        //console.log('User Count (before): ' + res.body.length);
        assert.equal(res.body.length, 1);

        // Now we change the data
        const userData = {
          email: 'paul.valley@datadisk.co.uk',
          password: 'update-password',
          role: 'user',
          accountActive: res.body.accountActive,
          createdOn: res.body.createdOn
        }

        // save the changed user data to Mongo DB
        server
          .put("/ddmovie_api/users/" + res.body[0]._id)
          .send(userData)
          .end(function(err, res) {

            // Now we check the user data has changed
            // make sure we search for the new name
            server
              .get("/ddmovie_api/users/email/paul.valley@datadisk.co.uk")
              .end(function (err, res) {
                console.log('User Count (after): ' + res.body.length);
                assert.equal(res.body[0].email, 'paul.valley@datadisk.co.uk');
                assert.equal(res.body[0].password, 'update-password');
                assert.equal(res.body[0].role, 'user');
                done();
              })
          })
      })
  });

});