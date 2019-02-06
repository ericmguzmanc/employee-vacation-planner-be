const UserService = require('../../services/userService')

function userSetup (req, res) {
  UserService.createUser(req)
    .then(doc => {
      if (!doc || doc.length === 0) {
        return res.status(500).send(doc)
      }
      console.log('User saved successfully!')
      res.json({ success: true })
    })
    .catch(err => {
      console.log('err ', err)
      res.status(500).json(err)
    })
}

function register(req, res) {
  UserService.createUser(req.body)
    .then((doc) => res.json(doc))
    .catch((err) => res.json(err));
}

function getAllUsers (req, res) {
  UserService.getAllUsers()
    .then(docs => {
      res.json(docs)
    })
    .catch(err => {
      res.status(500).json(err)
    })
}

module.exports = {
  userSetup,
  getAllUsers,
  register
}