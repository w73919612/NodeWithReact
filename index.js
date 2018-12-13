const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
require('./models/users')
require('./services/passport.js');

mongoose.connect(keys.mongoUri);
const app = express();
// app.get('/', (req, res) => {
//   res.send({ bye: 'buddy'});
// });
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);

app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app); /* the require statement essentially
                                       returns the function from authRoutes.js,
                                       and then the (app) gets provided as the
                                       argument for that function. */

const PORT  = process.env.PORT || 5000;
app.listen(PORT);
