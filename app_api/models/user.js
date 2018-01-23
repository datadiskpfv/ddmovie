const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = new Schema({
  email: {type: String, lowercase: true, required: [true, 'email address required'], match: [/\S+@\S+\.\S+/, 'is invalid']},
  password: {type: String, required: [true, 'password required']},
  role: {type: String, enum: ['user', 'admin'], default: "user", required: [true, 'role required'] },
  createdOn: {type: Date, default: Date.now},
  accountActive: {type: Boolean, default: true}
});

userSchema.plugin(uniqueValidator, { message : 'Name must be unique.'});

userSchema.index({ email: 1 }, { unique: true, background: false });

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

const User = mongoose.model('user', userSchema);

User.on('index', function (error) {
    console.log("Index's created")
    if (error) console.log("Problem creating indexes" + error);
})

module.exports = User;