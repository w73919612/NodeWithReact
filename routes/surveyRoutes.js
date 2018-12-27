const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');
const Survey = mongoose.model('surveys');

module.exports = app => {
  app.get('/api/surveys/thanks', (req,res) => {
    res.send('<H2>Thanks for voting!</H2>');
  });

  app.post('/api/surveys', requireLogin, requireCredits, async (req,res) => {
    const { title, subject, body, recipients } = req.body;

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
      //recipients: recipients.split(',').map(email => ({ email: email.trim() })),
      recipients: recipients.split(',').map(email => ({ email })),
      _user: req.user.id,
      dateSent: Date.now()
    });
    // Great place to send email
    const mailer = new Mailer(survey, surveyTemplate(survey));

    try {
      await mailer.send();
      await survey.save();
      req.user.credits -= 1;
      const user = await req.user.save();
      res.send(user);  //bug fix here after lecture 168. Changed from req to
                       //    res. Then the redirect to /surveys worked.
    } catch (err) {
      res.status(422).send(err);
    }
  });
};
