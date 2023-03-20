const express = require('express');
const router = express.Router();
const apicache = require('apicache');

const workoutController = require('../../controllers/workoutController');
const recordController = require('../../controllers/recordController');

// Custom made middlewares
//const authenticate = require("../../middlewares/authenticate");
//const authorize = require("../../middlewares/authorize");

// how to use middleware
//router.post("/", authenticate, authorize, workoutController.createNewWorkout);

const cache = apicache.middleware;

/**
 * @openapi
 * /api/v1/workouts:
 *   get:
 *     tags:
 *       - Workouts
 *     parameters:
 *       - in: query
 *         name: mode
 *         schema:
 *           type: string
 *         description: The mode of a workout
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: "#/components/schemas/Workout"
 *       5XX:
 *         description: FAILED
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: FAILED
 *                 data:
 *                   type: object
 *                   properties:
 *                     error:
 *                       type: string
 *                       example: "Some error message"
 */
router.get('/', cache('2 minutes'), workoutController.getAllWorkouts);

router.get('/:workoutId', workoutController.getOneWorkout);

router.post('/', workoutController.createNewWorkout);

router.patch('/:workoutId', workoutController.updateOneWorkout);

router.delete('/:workoutId', workoutController.deleteOneWorkout);

router.get(
  '/:workoutId/records',
  recordController.getRecordsForWorkout
);

module.exports = router;
