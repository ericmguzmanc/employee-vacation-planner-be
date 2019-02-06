const AuthService = require('../../services/authService')

function authenticateUser (req, res) {
  AuthService.authenticateUser(req)
    .then(doc => res.json(doc))
    .catch(err => res.json(err));
}

module.exports = {
  authenticateUser
}