const UserModel = require('../db/models/user')


async function createUser(params) {
  // return await promise;
  const User = new UserModel({
    email: params.email,
    password: params.password,
    name: params.name || null,
    admin: true,
  });
  
  const doesUserExists = await UserModel.find({ email: params.email});
  
  const promise = new Promise((resolve, reject) => {
   
    if (doesUserExists.length) {
      reject({ success: false, message: `email ${params.email} is already taken` });
    }

    try {

      User.save()
      .then(doc => { 
          resolve(doc) 
      }) 
      .catch(err => {
        if (err.message) {
          reject({ success: false, message: err.message})
        }
        reject({ success: false, message: err }) 
      })

    } catch (err) {
      // console.log('err -> ', err);
    }

  });

  return await promise;
}

async function getAllUsers() {
  const promise = new Promise((resolve, reject) => {
    UserModel.find()
      .then(docs => resolve(docs))
      .catch(err => reject(err))
  });

  return await promise;;
}

module.exports = {
  createUser,
  getAllUsers
}