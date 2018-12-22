//'next' is the function that passes off the request to the next middleware.
module.exports = (req, res, next) => {
  if (!req.user) {
    return res.status(401).send({ error: 'You must login!' })
  }
  //Everything looks good so go to next.
  next();
};
