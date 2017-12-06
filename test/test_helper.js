const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

before((done) => {
  mongoose.connect('mongodb://localhost/ddmovies', {useMongoClient: true});
  mongoose.connection
    .once('open', () => { /* console.log('DB connected - ddmovies') ; */ done();})
    .on('error', (error) => {
      console.log('Error: ' + error)
    });
});


beforeEach((done) => {
  mongoose.connection.db.dropCollection('users', () =>{
    //console.log('User collection dropped');
  });

  mongoose.connection.db.dropCollection('reviews', () =>{
    //console.log('Review collection dropped');
  });

  mongoose.connection.db.dropCollection('movies', () =>{
    //console.log('Movie collection dropped');
    done();
  });
});


after((done) => {
  mongoose.connection.close(function(){
    //console.log('DB disconnected');
    done();
  });
})
