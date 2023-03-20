/**
 * @openapi
 * components:
 *   schemas:
 *     Workout:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: 61dbae02-c147-4e28-863c-db7bd402b2d6
 *         name:
 *           type: string
 *           example: Tommy V
 *         mode:
 *           type: string
 *           example: For Time
 *         equipment:
 *           type: array
 *           items:
 *             type: string
 *           example: ["barbell", "rope"]
 *         exercises:
 *           type: array
 *           items:
 *             type: string
 *           example: ["21 thrusters", "12 rope climbs, 15 ft", "15 thrusters", "9 rope climbs, 15 ft", "9 thrusters", "6 rope climbs, 15 ft"]
 *         createdAt:
 *           type: string
 *           example: 4/20/2022, 2:21:56 PM
 *         updatedAt:
 *           type: string
 *           example: 4/20/2022, 2:21:56 PM
 *         trainerTips:
 *           type: array
 *           items:
 *             type: string
 *           example: ["Split the 21 thrusters as needed", "Try to do the 9 and 6 thrusters unbroken", "RX Weights: 115lb/75lb"]
 */

const DB = require('./db.json');
const { saveToDatabase } = require('./utils');

const RECORDS_PER_PAGE = 1;

const getAllWorkouts = (filterParams) => {
  try {
    let workouts = DB.workouts.sort(
      (a, b) => Date.parse(b.updatedAt) - Date.parse(a.updatedAt)
    );
    // filter by mode
    if (filterParams.mode) {
      workouts.filter((workout) =>
        workout.mode
          .toLowerCase()
          .includes(filterParams.mode.toLowerCase())
      );
    }
    // filter by equipment
    if (filterParams.equipment) {
      workouts.filter((workout) =>
        workout.equipment.find((e) =>
          e
            .toLowerCase()
            .includes(filterParams.equipment.toLowerCase())
        )
      );
    }
    // filter by exercises
    if (filterParams.exercise) {
      workouts.filter((workout) =>
        workout.exercises.find((exercise) =>
          exercise
            .toLowerCase()
            .includes(filterParams.exercise.toLowerCase())
        )
      );
    }

    // sort workouts
    if (filterParams.sort) {
      const sortBy = filterParams.sort;
      if (sortBy.includes('-') && sortBy.includes('createdAt')) {
        workouts.sort(
          (a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt)
        );
      }
      if (sortBy.includes('-') && sortBy.includes('updatedAt')) {
        workouts.sort(
          (a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt)
        );
      }
    }

    // get only n number of records
    if (filterParams.length) {
      workouts = workouts.slice(0, filterParams.length);
    }

    // get records of particular page
    if (filterParams.page) {
      const page = parseInt(filterParams.page, 10);
      workouts = workouts.slice(
        RECORDS_PER_PAGE * page - RECORDS_PER_PAGE,
        RECORDS_PER_PAGE * page
      );
    }

    return workouts;
  } catch (error) {
    throw { status: 500, message: error };
  }
};

const getOneWorkout = (workoutId) => {
  try {
    const workout = DB.workouts.find(
      (workout) => workout.id === workoutId
    );
    if (!workout) {
      throw {
        status: 400,
        message: `Can't find workout with id ${workoutId}`,
      };
    }
    return workout;
  } catch (error) {
    throw {
      status: error?.status || 500,
      message: error?.message || error,
    };
  }
};

const createNewWorkout = (newWorkout) => {
  try {
    const isAlreadyAdded =
      DB.workouts.findIndex(
        (workout) => workout.name === newWorkout.name
      ) > -1;
    if (isAlreadyAdded) {
      throw {
        status: 400,
        message: `Workout with name ${newWorkout.name} already exists`,
      };
    }
    DB.workouts.push(newWorkout);
    saveToDatabase(DB);
    return newWorkout;
  } catch (error) {
    throw {
      status: error?.status || 500,
      message: error?.message || error,
    };
  }
};

const updateOneWorkout = (workoutId, changes) => {
  try {
    const indexForUpdate = DB.workouts.findIndex(
      (workout) => workout.id === workoutId
    );

    if (indexForUpdate === -1) {
      throw {
        status: 400,
        message: `Can't find the workout with the id ${workoutId}`,
      };
    }

    const updatedWorkout = {
      ...DB.workouts[indexForUpdate],
      ...changes,
      updatedAt: new Date().toLocaleString('en-IN', {
        timeZone: 'UTC',
      }),
    };

    DB.workouts[indexForUpdate] = updatedWorkout;
    saveToDatabase(DB);
    return updatedWorkout;
  } catch (error) {
    throw {
      status: error?.status || 500,
      message: error?.message || error,
    };
  }
};

const deleteOneWorkout = (workoutId) => {
  try {
    const indexForDelete = DB.workouts.findIndex(
      (workout) => workout.id === workoutId
    );
    if (indexForDelete === -1) {
      throw {
        status: 400,
        message: `Can't find the workout with the id ${workoutId}`,
      };
    }
    DB.workouts.splice(indexForDelete, 1);
    saveToDatabase(DB);
  } catch (error) {
    throw {
      status: error?.status || 500,
      message: error?.message || error,
    };
  }
};

module.exports = {
  getAllWorkouts,
  getOneWorkout,
  createNewWorkout,
  updateOneWorkout,
  deleteOneWorkout,
};
