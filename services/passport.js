
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id)
    .then(user => {
      done(null, user);
    });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      //callbackURL: '/auth/google/callback'
                                            /* Having a relative path here is nice because it can be
                                                  appended to http:/ /localhost:5000 or
                                                  http(s):/ /...herokuapp.com
                                               However, our callback when running in production mode
                                                  is failing because the Google Strategy is returning
                                                  http instead of https
                                               This is happening for two reasons:
                                                  1. Google is seeing that the response from our server
                                                       is being returned from a proxy, and Google assumes
                                                       that if traffic is going through a proxy, it might
                                                       be nafarious.
                                                  2. However, heroku is using a proxy on AWS to route requests
                                                       through AWS to its heroku servers.

                                               To fix this we can either write out the entire callback URL
                                                  and decide whether to use a PROD or DEV version, or we can set
                                                  another Google Strategy Property called proxy: true.
                                              */
      callbackURL: keys.googleRedirectURI + '/auth/google/callback',
      proxy: true
    },
    // (accessToken, refreshToken, profile, done) => {
    //   User.findOne({ googleId: profile.id})
    //     .then((existingUser) => {
    //       if (existingUser) {
    //         // user already exists
    //         done(null, existingUser);
    //       } else {
    //         new User({ googleId: profile.id })
    //           .save()
    //           .then(user => done(null, user));
    //       }
    //     });


    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({ googleId: profile.id});
      if (existingUser) {
        // user already exists
        done(null, existingUser);
      } else {
        const user = await new User({ googleId: profile.id }).save()
        done(null, user);
      }


      //console.log('access token', accessToken);
      //console.log('refresh token', refreshToken);
      console.log('profile:', profile);
    }
  )
);
