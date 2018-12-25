const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');

const Survey = mongoose.model('surveys');

module.exports = app => {
  app.post('/api/surveys', requireLogin, requireCredits, (req,res) => {
    const { title, subject, body, recipients } = req.body

    const survey = new Survey({
      // title: title,
      // subject: subjecct,
      // body: body,
      // because of new ES2015/JS8 syntax, if they are the same, you don't have
      //    to put both
      title,
      subject,
      body,
      //recipients: recipients.split(',').map(email => { return {email: email}})
      //with new syntax, the map function can be simplified:
        //recipients: recipients.split(',').map(email => ({ email })),
      //however because there may be some leading/trailing whitespace:
      recipients: recipients.split(',').map(email => ({ email: email.trim() })),
      _user: req.user.id,
      dateSent: Date.now()
    });

  });
};
