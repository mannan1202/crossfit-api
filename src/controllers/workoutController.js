const workoutService = require('../services/workoutService');

const getAllWorkouts = (req, res) => {
  //const { mode } = req.query;
  try {
    const allWorkouts = workoutService.getAllWorkouts(req.query);
    res.send({ status: 'OK', data: allWorkouts });
  } catch (error) {
    res.status(error?.status || 500).send({
      status: 'FAILED',
      data: {
        error: error?.message || error,
      },
    });
  }
};

const getOneWorkout = (req, res) => {
  const {
    params: { workoutId },
  } = req;
  if (!workoutId) {
    res.status(400).send({
      status: 'FAILED',
      data: { error: `Parameter ':workoutId' cannot be empty` },
    });
    return;
  }
  try {
    const workout = workoutService.getOneWorkout(workoutId);
    res.send({ status: 'OK', data: workout });
  } catch (error) {
    res.status(error?.status || 500).send({
      status: 'FAILED',
      data: { error: error?.message || error },
    });
  }
};

const createNewWorkout = (req, res) => {
  const { body } = req;

  //validation
  if (
    !body.name ||
    !body.mode ||
    !body.equipment ||
    !body.exercises ||
    !body.trainerTips
  ) {
    res.status(400).send({
      status: 'FAILED',
      data: {
        error:
          "One of the following keys is missing or is empty in the request body: 'name', 'mode, 'equipment','exercies','trainerTips'",
      },
    });
    return;
  }

  // create new workout object
  const newWorkout = {
    name: body.name,
    mode: body.mode,
    equipment: body.equipment,
    exercises: body.exercies,
    trainerTips: body.trainerTips,
  };
  try {
    const createdWorkout =
      workoutService.createNewWorkout(newWorkout);
    res.status(201).send({ status: 'OK', data: createdWorkout });
  } catch (error) {
    res.status(error?.status || 500).send({
      status: 'FAILED',
      data: { error: error?.message || error },
    });
  }
};

const updateOneWorkout = (req, res) => {
  const {
    body,
    params: { workoutId },
  } = req;
  if (!workoutId) {
    res.status(400).send({
      status: 'FAILED',
      data: { error: `Parameter ':workoutId' cannot be empty` },
    });
    return;
  }
  try {
    const updatedWorkout = workoutService.updateOneWorkout(
      workoutId,
      body
    );
    res.send({ status: 'OK', data: updatedWorkout });
  } catch (error) {
    res.status(error?.status || 500).send({
      status: 'FAILED',
      data: { error: error?.message || error },
    });
  }
};

const deleteOneWorkout = (req, res) => {
  const {
    params: { workoutId },
  } = req;
  if (!workoutId) {
    res.status(400).send({
      status: 'FAILED',
      data: { error: `Parameter ':workoutId' cannot be empty` },
    });
    return;
  }
  try {
    workoutService.deleteOneWorkout(workoutId);
    res.status(204).send({ status: 'OK' });
  } catch (error) {
    res.status(error?.status || 500).send({
      status: 'FAILED',
      data: { error: error?.message || error },
    });
  }
};

module.exports = {
  getAllWorkouts,
  getOneWorkout,
  createNewWorkout,
  updateOneWorkout,
  deleteOneWorkout,
};
