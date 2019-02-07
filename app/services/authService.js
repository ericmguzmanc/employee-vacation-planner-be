const jwt = require('jsonwebtoken');
const UserModel = require('../db/models/user');
const config = require('../config/config');


async function authenticateUser(req, res) {
  if(!req.body.email) {
    return res.status(400).send('Missing URL parameter: email')
  }
  
  const promise = new Promise((resolve, reject) => {
    // find the user
    UserModel.findOne({
      email: req.body.email
    })
    .then(user => {
      if (!user) {
        // res.json({ success: false, message: 'Authentication failed. User not found.' })
        resolve({ success: false, message: 'Authentication failed. User not found.' });
      } else if (user) {
  
        // check if password matches
        user.comparePassword(req.body.password)
          .then(isMatch => {
            if (!isMatch) {
              // res.json({ success: false, message: 'Authentication failed. Wrong password.'})
              resolve({ success: false, message: 'Authentication failed. Wrong password.'})
            } else {
            
              // if user is found and password is right
              // create a token with only our given payload
              // we don't want to pass in the entire user since that has the password
              const payload = { 
                _id: user._id,
                email: user.email,
                admin: user.admin 
              }
              const token = jwt.sign(payload, config.secret, {
                expiresIn: config.tokenExpirationTime // expires in 24 hours
              })
              
              // return information including token as JSON
              resolve({
                success: true,
                message: 'Token created!',
                token: token
              })
            }
          })
      }
    })
    .catch(err => reject(err));
  });
  
  return await promise;
}

async function validateToken(req, next) {

  const token = req.body.token || req.query.token || req.headers['x-access-token']

  const promise = new Promise((resolve, reject) => {
    // decode token
    if (token) {
      // verifies secret and checks exp
      jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
          if (err.TokenExpiredError) {
            resolve({ success: false, message: 'Token Expired' })
          }
            resolve({ success: false, message: 'Failed to authenticate token.' })
        }
        // if everything is good, save to request for use in other routes
        req.decoded = decoded
        next()
      })
    } else {
      // if there is no token
      // return an error
      reject({
        success: false,
        message: 'No token provided'
      })
    }
  })

  return await promise;
}

module.exports = {
  authenticateUser,
  validateToken
}