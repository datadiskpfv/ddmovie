// Use the below to pull this file in
//
//const {server, assert, util} = require('../../common/common');

const supertest = require("supertest");

exports.server = supertest.agent("http://localhost:3000");
exports.assert = require('assert');
exports.util = require('util');

// can also export plain old variables
//exports.test = "Hello World!";