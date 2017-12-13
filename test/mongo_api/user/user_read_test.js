const {server, assert, util} = require('../../common/common');

describe('API User read test', () => {

  beforeEach( (done) => {
    server
      .post("/ddmovie_api/users")
      .send({email: 'paul.valle@datadisk.co.uk', password: 'password99', role: 'admin'})
      .end(function(err, res) {});

    server
      .post("/ddmovie_api/users")
      .send({email: 'lorraine.valle@datadisk.co.uk', password: 'password88', role: 'user'})
      .end(function(err, res) {done();} );
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
        assert.equal(res.body[0].email, 'lorraine.valle@datadisk.co.uk');
        assert.equal(res.body[0].password, 'password88');
        assert.equal(res.body[0].role, 'user');

        // check that user has been retrieved
        assert.equal(res.body[1].email, 'paul.valle@datadisk.co.uk');
        assert.equal(res.body[1].password, 'password99');
        assert.equal(res.body[1].role, 'admin');

        done();
      });
  });

  it('can list a specific user by using an email address', (done) => {
    server
      .get("/ddmovie_api/users/email/paul.valle@datadisk.co.uk")
      .end(function (err, res) {
        // check that user has been retrieved
        assert.equal(res.body[0].email, 'paul.valle@datadisk.co.uk');
        assert.equal(res.body[0].password, 'password99');
        assert.equal(res.body[0].role, 'admin');
        done();
      });
  });

  it('can search for a specific user (email)', (done) => {
    server
      .get("/ddmovie_api/users/search/paul")
      .end(function (err, res) {
        // check that user has been retrieved
        assert.equal(res.body[0].email, 'paul.valle@datadisk.co.uk');
        assert.equal(res.body[0].password, 'password99');
        assert.equal(res.body[0].role, 'admin');
      });

    server
      .get("/ddmovie_api/users/search/lorraine")
      .end(function (err, res) {
        // check that user has been retrieved
        assert.equal(res.body[0].email, 'lorraine.valle@datadisk.co.uk');
        assert.equal(res.body[0].password, 'password88');
        assert.equal(res.body[0].role, 'user');
        done();
      });
  });

  it('can search for a number of users (email)', (done) => {
    server
      .get("/ddmovie_api/users/search/l")
      .end(function (err, res) {
        // check that user has been retrieved
        assert.equal(res.body[0].email, 'lorraine.valle@datadisk.co.uk');
        assert.equal(res.body[1].email, 'paul.valle@datadisk.co.uk');
        done();
      });
  })
});