const {server, assert, util} = require('../../common/common');

describe('API User delete test', () => {

  beforeEach((done) => {
    server
      .post("/ddmovie_api/users")
      .send({email: 'paul.valle@datadisk.co.uk', password: 'passworddel', role: 'admin'})
      .end(function (err, res) {done();});
  });

  it('can delete a specific user', (done) => {

    // because its all async we have to nest each test to make sure
    // that the task has completed before moving onto the next task

    // First we get the User ID
    server
      .get("/ddmovie_api/users/email/paul.valle@datadisk.co.uk")
      .end(function (err, res) {
        //console.log('User ID: ' + res.body[0]._id);
        //console.log('User Count (before): ' + res.body.length);
        assert.equal(res.body.length, 1);

        // Now we delete the user from the Mongo DB
        server
          .post("/ddmovie_api/users/" + res.body[0]._id)
          .end(function(err, res) {

            // Now we check the user has been deleted
            server
              .get("/ddmovie_api/users")
              .end(function (err, res) {
                //console.log('User Count (after): ' + res.body.length);
                assert.equal(res.body.length, 0);
                done();
              })
          })
      })

  });

});