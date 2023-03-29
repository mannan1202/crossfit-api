const User = require('../database/User');

const createNewUser = (newUser) => {
  const userToInsert = {
    ...newUser,
    createdAt: new Date().toLocaleString('en-IN', {
      timezone: 'UTC',
    }),
    updatedAt: new Date().toLocaleString('en-IN', {
      timezone: 'UTC',
    }),
  };
  try {
    const createdUser = User.createNewUser(userToInsert);
    return createdUser;
  } catch (error) {
    throw error;
  }
};

const loginUser = (email, password) => {
  // check for email and password
  // generate token
  // return token
  return 'token';
};

module.exports = {
  createNewUser,
  loginUser,
};
