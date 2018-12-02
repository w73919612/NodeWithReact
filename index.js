const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('./config/keys');

const app = express();

// app.get('/', (req, res) => {
//   res.send({ bye: 'buddy'});
// });

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback'
    },
    (accessToken, refreshToken, profile, done) => {
      console.log('access token', accessToken);
        console.log('refresh token', refreshToken);
          console.log('profile:', profile);
    }
  )
);

app.get('/auth/google/callback', passport.authenticate('google'));  //GoogleStrategy has this thing where its looking for keyword 'google'

app.get('/auth/google',
  passport.authenticate('google', {
    scope: ['profile', 'email']
  })
);


const PORT  = process.env.PORT || 5000;
app.listen(PORT);
