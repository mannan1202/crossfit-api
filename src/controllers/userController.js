const userService = require('../services/userService');

const createNewUser = (req, res) => {
  const { body } = req;

  // for the user object

  try {
    const createdUser = userService.createNewUser(newUser);
    res.status(201).send({ status: 'OK', data: createdUser });
  } catch (error) {
    res.status(error?.status || 500).send({
      status: 'FAILED',
      data: { error: error?.message || error },
    });
  }
};

const loginUser = (req, res) => {
  const { body } = req;

  try {
  } catch (error) {
    res.status(error?.status || 500).send({
      status: 'FAILED',
      data: { error: error?.message || error },
    });
  }
};

module.exports = {
  createNewUser,
  loginUser,
};
