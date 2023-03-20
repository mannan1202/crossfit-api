const recordService = require('../services/recordService');

const getAllWorkoutRecords = (req, res) => {
  try {
    const workoutRecords = recordService.getAllWorkoutRecords();
    res.send({ status: 'OK', data: workoutRecords });
  } catch (error) {
    res.status(error?.status || 500).send({
      status: 'FAILED',
      message: { error: error?.message || error },
    });
  }
};

const getOneWorkoutRecord = (req, res) => {
  try {
    const {
      params: { workoutRecordId },
    } = req;
    if (!workoutRecordId) {
      throw {
        status: 400,
        message: `Parameter ':workoutRecordId' cannot be empty`,
      };
    }
    const workoutRecord =
      recordService.getOneWorkoutRecord(workoutRecordId);
    res.send({ status: 'OK', data: workoutRecord });
  } catch (error) {
    res.status(error?.status || 500).send({
      status: 'FAILED',
      message: { error: error?.message || error },
    });
  }
};

const createNewWorkoutRecord = (req, res) => {
  try {
    const { body } = req;
    if (!body.workoutId || !body.record) {
      throw {
        status: 400,
        message: `one of parameters is either missing or empty : 'workoutId', 'record'`,
      };
    }
    const newWorkoutRecord = {
      ...body,
      id: uuid(),
      createdAt: new Date().toLocaleString('en-IN', {
        timeZone: 'UTC',
      }),
      updatedAt: new Date().toLocaleString('en-IN', {
        timeZone: 'UTC',
      }),
    };
    const createdWorkoutRecord =
      recordService.createNewWorkoutRecord(newWorkoutRecord);
    res
      .status(201)
      .send({ status: 'OK', data: createNewWorkoutRecord });
  } catch (error) {
    res.status(error?.status || 500).send({
      status: 'FAILED',
      message: { error: error?.message || error },
    });
  }
};

const updateOneWorkoutRecord = (req, res) => {
  try {
    const {
      body,
      params: { workoutRecordId },
    } = req;
    if (!workoutRecordId) {
      throw {
        status: 400,
        message: `Parameter ':workoutRecordId' cannot be empty`,
      };
    }
    const updatedWorkoutRecord = recordService.updateOneWorkoutRecord(
      workoutRecordId,
      body
    );
    res.send({ status: 'OK', data: updatedWorkoutRecord });
  } catch (error) {
    res.status(error?.status || 500).send({
      status: 'FAILED',
      message: { error: error?.message || error },
    });
  }
};

const deleteOneWorkoutRecord = (req, res) => {
  try {
    const {
      params: { workoutRecordId },
    } = req;
    if (!workoutRecordId) {
      throw {
        status: 400,
        message: `Parameter ':workoutRecordId' cannot be empty`,
      };
    }
    recordService.deleteOneWorkoutRecord(workoutRecordId);
    res.status(204).send({ status: 'OK' });
  } catch (error) {
    res.status(error?.status || 500).send({
      status: 'FAILED',
      message: { error: error?.message || error },
    });
  }
};

const getRecordsForWorkout = (req, res) => {
  try {
    const {
      params: { workoutId },
    } = req;
    if (!workoutId) {
      throw {
        status: 400,
        message: `Parameter ':workoutId' can't be empty`,
      };
    }
    const records = recordService.getRecordsForWorkout(workoutId);
    res.send({ status: 'OK', data: records });
  } catch (error) {
    res.status(error?.status || 500).send({
      status: 'FAILED',
      message: { error: error?.message || error },
    });
  }
};

module.exports = {
  getAllWorkoutRecords,
  getOneWorkoutRecord,
  createNewWorkoutRecord,
  updateOneWorkoutRecord,
  deleteOneWorkoutRecord,
  getRecordsForWorkout,
};
