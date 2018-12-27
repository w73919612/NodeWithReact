const mongoose = require('mongoose');
const { Schema } = mongoose;  //this is called desstructuring 

const userSchema = new Schema({
  googleId: String,
  credits: { type: Number, default: 0 } //checkout mongoose docs to see diff properties which can be sent
});

mongoose.model('users', userSchema);
