const _ = require('lodash');  // by convention we us _ for lodash variable
// I got the error discussed in: Section 12, Lecture 179, because I have a
// later version of path-parser than Stephen did (i.e. 2.0.2) when he
// recorded this course, so I have 3 options:
//
//. In your surveyRoutes.js change the require import to:

// 1. const Path = require('path-parser').default;
// 2. In your surveyRoutes.js change the require import to:
// const { Path } = require('path-parser');
// 3. Downgrade your path-parser module and leave the import as it is:
// npm uninstall --save path-parser
// npm install --save path-parser@2.0.2
//DONT USE THIS (unless choosing option(3)):const Path = require('path-parser');
const Path = require('path-parser').default;

const { URL } = require ('url'); //url library has a bunch of helpers but we are
                                // desstructuring it to just use the URL helper.
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

  app.post('/api/surveys/webhooks', (req,res) => {
  //  console.log(req.body);
  //  res.send({});

  // iterate over event with map function from lodash
    const events = _.map(req.body, (event) => {
    const pathname = new URL(event.url).pathname;
    //now we give pattern to look for in the url passed to us in request. The
    // words with ":" before them are variables we will store what the pattern
    // starting with /api/surveys/ returns.
    const p = new Path('/api/surveys/:surveyId/:choice');
    //console.log(p.test(pathname)); //console spits:
                      //{ surveyId: '5c2806a8369bed3f2026b693', choice: 'yes' }
    const match = p.test(pathname);
    if (match) {
      return {email: event.email, surveyId: match.surveyId, choice: match.choice}
    }
  });

  console.log(events);
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
