const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);
const requireLogin = require('../middlewares/requireLogin');

module.exports = app => {
  app.post(
    //For all the get,post, etc, we can pass in as many middlewares after then
    // route, as long as eventually at least one of them gets called and gives
    // back a response of where to go/what to do.  e.g. requireLogin, asdfa, etc
    '/api/stripe', requireLogin, async (req, res) => {
      const charge = await stripe.charges.create({
        amount: 500,
        currency: 'usd',
        description: '$5 for 5 credits',
        source: req.body.id
    });
  //console.log(charge);
    req.user.credits += 5;
    const user = await req.user.save();

    res.send(user);
  });
};
