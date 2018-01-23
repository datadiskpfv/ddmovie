const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const crypto = require('crypto');

const uniqueValidator = require('mongoose-unique-validator');
const jwt = require('jsonwebtoken');

const userSchema = new Schema({
  email: {type: String, lowercase: true, required: [true, 'email address required'], match: [/\S+@\S+\.\S+/, 'is invalid']},
  password: {type: String, required: [true, 'password required']},
  role: {type: String, enum: ['user', 'admin'], default: "user", required: [true, 'role required'] },
  createdOn: {type: Date, default: Date.now},
  accountActive: {type: Boolean, default: true},
  salt: {type: String}
});

userSchema.plugin(uniqueValidator, { message : 'Name must be unique.'});

// the number represents the order: 1 means asc, -1 means desc
userSchema.index({ email: 1 }, { unique: true, background: false });
userSchema.index({ email: 1, role: -1 }, { unique: true, background: false });

// virtual types are not saved to the DB and are run on the fly
// get is like a getter ( and setter) function
// we use a function because it allows access to the instance this
// fat arrow would reference the whole file instead of the instance
userSchema.virtual('fullName')
  .get( function() {
    let data1 = this.email.split("@");
    let data2 = data1[0].split(".");

    return data2[0].charAt(0).toUpperCase() + " " + data2[1].charAt(0).toUpperCase();
  });


userSchema.methods.setPassword = function(password){
    console.log('Generating hashed password');
    this.salt = crypto.randomBytes(16).toString('hex');
    this.password = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
    return this.password;
};

userSchema.methods.validPassword = function(password) {
    let hashed_password = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
    return this.password === hashed_password;
};

userSchema.methods.generateJwt = function() {
    let expiry = new Date();
    expiry.setDate(expiry.getDate() + 7);
    return jwt.sign({
        _id: this._id,
        email: this.email,
        exp: parseInt(expiry.getTime() / 1000),
    }, process.env.JWT_SECRET );
};

const User = mongoose.model('user', userSchema);

User.on('index', function (error) {
    console.log("Index's created")
    if (error) console.log("Problem creating indexes" + error);
})

module.exports = User;