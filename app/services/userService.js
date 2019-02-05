const UserModel = require('../db/models/user')


async function createUser(req) {
  // create a sample user
  const User = new UserModel({
    name: 'Juan Perez2',
    password: 'password2',
    admin: true
  });

  const promise = new Promise((resolve, reject) => {
    // save the sample user
    User.save()
      .then(doc => resolve(doc))
      .catch(err => reject(err));
  });
  const response = await promise;

  return response;
}

async function getAllUsers() {
  const promise = new Promise((resolve, reject) => {
    UserModel.find()
      .then(docs => resolve(docs))
      .catch(err => reject(err))
  });
  const response = await promise;

  return response;
}



module.exports = {
  createUser,
  getAllUsers
}