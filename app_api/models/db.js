var mongoose = require( 'mongoose' );
//var util = require('util');

mongoose.Promise = global.Promise;

var dbURI = 'mongodb://localhost/ddmovies';
mongoose.connect(dbURI, {useMongoClient: true});

mongoose.connection.on('connected', function () {
    console.log('Mongoose connected to ' + dbURI);
});

mongoose.connection.on('error',function (err) {
    console.log('Mongoose connection error: ' + err);
});

mongoose.connection.on('disconnected', function () {
    console.log('Mongoose disconnected');
});

var gracefulShutdown = function (msg, callback) {
    mongoose.connection.close(function () {
        console.log('Mongoose disconnected through ' + msg);
        callback();
    });
};

process.once('SIGUSR2', function () {
    gracefulShutdown('node restart', function () {
        process.kill(process.pid, 'SIGUSR2');
    });
});

process.on('SIGINT', function () {
    gracefulShutdown('app termination', function () {
        process.exit(0);
    });
});

process.on('SIGTERM', function() {
    gracefulShutdown('Heroku app shutdown', function () {
        process.exit(0);
    });
});

// Schema definitions
require('./movie');
require('./user');
require('./review');