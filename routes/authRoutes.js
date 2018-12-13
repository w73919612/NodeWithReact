const passport = require('passport');

module.exports = (app) => {
  app.get(
    '/auth/google',
    passport.authenticate('google', {
    scope: ['profile', 'email']
    })
  );

  app.get(
    '/auth/google/callback',
    passport.authenticate('google')
  );  //GoogleStrategy has this thing where its looking for keyword 'google'

  app.get('/api/current-user', (req, res) => {
    res.send(req.user);
  });
};
