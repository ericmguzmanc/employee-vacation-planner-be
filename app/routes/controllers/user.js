const UserService = require('../../services/userService')

async function userSetup (req, res) {
  await UserService.createUser(req)
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

async function getAllUsers (req, res) {
  await UserService.getAllUsers()
    .then(docs => {
      res.json(docs)
    })
    .catch(err => {
      res.status(500).json(err)
    })
}

module.exports = {
  userSetup,
  getAllUsers
}