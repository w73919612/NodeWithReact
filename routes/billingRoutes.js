const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);

module.exports = app => {

    // app.post(
    //   '/api/stripe', (req, res) => {
    //     stripe.charges.create({
    //       amount: 500,
    //       currency: 'usd',
    //       description: '$5 for 5 credits',
    //       source: req.body.id
    //     }, function(err, charge) {
    //       // callback asynchronously called
    //     //console.log(req.body);
    // });


    app.post(
      '/api/stripe', async (req, res) => {
        const charge = await stripe.charges.create({
          amount: 500,
          currency: 'usd',
          description: '$5 for 5 credits',
          source: req.body.id
      });
      console.log(charge);
  });
};
