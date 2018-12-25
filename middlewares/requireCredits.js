//'next' is the function that passes off the request to the next middleware.
module.exports = (req, res, next) => {
  if (req.user.credits < 1) {
    return res.status(403).send({ error: 'You must purchase credits!' })
  }
  //Everything looks good so go to next.
  next();
};
