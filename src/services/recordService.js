const { v4: uuid } = require('uuid');
const WorkoutRecord = require('../database/WorkoutRecord');

const getAllWorkoutRecords = () => {
  try {
    return WorkoutRecord.getAllWorkoutRecords();
  } catch (error) {
    throw error;
  }
};

const getOneWorkoutRecord = () => {
  try {
    return WorkoutRecord.getOneWorkoutRecord();
  } catch (error) {
    throw error;
  }
};

const createNewWorkoutRecord = (newWorkoutRecord) => {
  try {
    return WorkoutRecord.createNewWorkoutRecord(newWorkoutRecord);
  } catch (error) {
    throw error;
  }
};

const updateOneWorkoutRecord = (workoutRecordId, changes) => {
  try {
    return WorkoutRecord.updateOneWorkoutRecord(
      workoutRecordId,
      changes
    );
  } catch (error) {
    throw error;
  }
};

const deleteOneWorkoutRecord = (workoutRecordId) => {
  try {
    return WorkoutRecord.deleteOneWorkoutRecord(workoutRecordId);
  } catch (error) {
    throw error;
  }
};

const getRecordsForWorkout = (workoutId) => {
  try {
    return WorkoutRecord.getRecordsForWorkout(workoutId);
  } catch (error) {
    throw error;
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
