const express = require('express');
const router = express.Router();

const userController = require('../../controllers/userController');

// Custom made middlewares
//const authenticate = require("../../middlewares/authenticate");
//const authorize = require("../../middlewares/authorize");

// how to use middleware
//router.post("/", authenticate, authorize, workoutController.createNewWorkout);

//router.get('/', userController.);

router.post('/create', userController.createNewUser);

router.post('/login', userController.loginUser);

module.exports = router;
