const AuthService = require('../../services/authService')

async function authenticateUser (req, res) {
  await AuthService.authenticateUser(req)
      .then(doc => res.json(doc))
      .catch(err => res.json(err));
}

module.exports = {
  authenticateUser
}