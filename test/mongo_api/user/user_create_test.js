const {server, assert, util} = require('../../common/common');
const User = require('../../../app_api/models/user');

describe('API User create test', () => {

  it.only('can create a User', (done) => {

    let user = {
      email: 'Paul.Valle@datadisk.co.uk',
      password: 'passwordPassport',
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
            //assert.equal(res.body[0].password, 'passwordPassport');
            assert.equal(res.body[0].role, 'admin');
            done();
          });
      });
  });

    it('can create a unique User', (done) => {

        let user1 = {
            email: 'paul.valle@datadisk.co.uk',
            password: 'password',
            role: 'admin'
        }

        let user2 = {
            email: 'paul.valle@datadisk.co.uk',
            password: 'passwordunique',
            role: 'admin'
        }

        server
            .post("/ddmovie_api/users")
            .send(user1)
            .expect(201)      // if anything other than 201 'err' will be populated
            .end(function(err, res) {

                // check for any errors post request errors
                if (err) {
                    console.log('Error: ' + err);
                    done(err)       // stop the test if we have an error
                }

                // check that we got back a 201
                assert.equal(res.statusCode, 201);
            });

        server
            .post("/ddmovie_api/users")
            .send(user2)
            .expect(404)      // if anything other than 201 'err' will be populated
            .end(function(err, res) {

                // check for any errors post request errors
                if (err) {
                    console.log('Error: ' + err);
                    done(err)       // stop the test if we have an error
                }

                //console.log("err and res " + err + " " + util.inspect(res));

                // check that we got back a 404
                assert.equal(res.statusCode, 404);

                // assert does not have string comparison unbelievable
                //assert.has(res.body.errmsg, 'duplicate key error');
                done();
            });
    });
});