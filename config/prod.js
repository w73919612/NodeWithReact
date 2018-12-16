//prod.js - Production Keys Go HERE. committed.

module.exports = {
  googleClientID: process.env.GOOGLE_CLIENT_ID,
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
  mongoUri: process.env.MONGO_URI,
  cookieKey: process.env.COOKIEKEY,
  googleRedirectURI: process.env.GOOGLE_REDIRECT_URI
}