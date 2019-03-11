const AuthService = require('../../services/authService');

function validateToken(req, res, next) {
  AuthService.validateToken(req, next)
    .then(doc => res.json(doc))
    .catch(err => res.json(err));
}

module.exports = {
  validateToken
}