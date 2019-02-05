const AuthService = require('../../services/authService');

async function validateToken(req, res, next) {
  await AuthService.validateToken(req, next)
      .then(doc => res.json(doc))
      .catch(err => res.status(403).send(err));
}

module.exports = {
  validateToken
}