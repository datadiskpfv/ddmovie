const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {type: String, required: [true, 'email address required']},
  password: {type: String, required: [true, 'password required']},
  role: {type: String, enum: ['user', 'admin'], default: "user", required: [true, 'role required'] }
});

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

module.exports = User;