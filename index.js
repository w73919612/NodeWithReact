const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
const bodyParser = require('body-parser');
require('./models/users')
require('./services/passport.js');

mongoose.connect(keys.mongoUri);
const app = express();
// app.get('/', (req, res) => {
//   res.send({ bye: 'buddy'});
// });

//MIDDLEWARES modify REQUEST after REQUEST has come
         //       in and passed through Express App.
app.use(bodyParser.json());
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);
app.use( passport.initialize() );
app.use( passport.session() );

//Then we define our routers for  the modified REQUEST to be routed by.
require('./routes/authRoutes')(app); /* the require statement essentially
                                       returns the function from authRoutes.js,
                                       and then the (app) gets provided as the
                                       argument for that function. */
require('./routes/billingRoutes')(app);

if (process.env.NODE_ENV === 'production') {
  //Make sure that Express will serve up production assets.
  // like our main.js file, or our main.css file.
  app.use(express.static('client/build'));

  //Express will serve up index.html file if it doesn't recognize the route.
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}
const PORT  = process.env.PORT || 5000;
app.listen(PORT);
