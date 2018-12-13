const mongoose = require('mongoose');
const Schema = mongoose.Schema; // or   const {Schema} = mongoose;  this is called desstructuring

const userSchema = new Schema({
  googleId: String
});

mongoose.model('users', userSchema);
