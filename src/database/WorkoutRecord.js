const DB = require('./db.json');
const { saveToDatabase } = require('./utils');

const getAllWorkoutRecords = () => {
  try {
    return DB.records;
  } catch (error) {
    throw { status: 500, message: error };
  }
};

const getOneWorkoutRecord = (workoutRecordId) => {
  try {
    const workoutRecord = DB.records.find(
      (workoutRecord) => workoutRecord.id === workoutRecordId
    );
    if (!workoutRecord) {
      throw {
        status: 400,
        message: `Can't find workout record with id ${workoutId}`,
      };
    }
    return workoutRecord;
  } catch (error) {
    throw {
      status: error?.status || 500,
      message: error?.message || error,
    };
  }
};

const createNewWorkoutRecord = (newWorkoutRecord) => {
  try {
    DB.records.push(newWorkoutRecord);
    saveToDatabase(DB);
    return newWorkoutRecord;
  } catch (error) {
    throw {
      status: error?.status || 500,
      message: error?.message || error,
    };
  }
};

const updateOneWorkoutRecord = (workoutRecordId, changes) => {
  try {
    const indexForUpdate = DB.records.findIndex(
      (workoutRecord) => workoutRecord.id === workoutRecordId
    );

    if (indexForUpdate === -1) {
      throw {
        status: 400,
        message: `Can't find the workout record with the id ${workoutRecordId}`,
      };
    }

    const updatedWorkoutRecord = {
      ...DB.records[indexForUpdate],
      ...changes,
      updatedAt: new Date().toLocaleString('en-IN', {
        timeZone: 'UTC',
      }),
    };

    DB.records[indexForUpdate] = updatedWorkoutRecord;
    saveToDatabase(DB);
    return updatedWorkoutRecord;
  } catch (error) {
    throw {
      status: error?.status || 500,
      message: error?.message || error,
    };
  }
};

const deleteOneWorkoutRecord = (workoutRecordId) => {
  try {
    const indexForDelete = DB.records.findIndex(
      (workoutRecord) => workoutRecord.id === workoutRecordId
    );
    if (indexForDelete === -1) {
      throw {
        status: 400,
        message: `Can't find the workout record with the id ${workoutRecordId}`,
      };
    }
    DB.records.splice(indexForDelete, 1);
    saveToDatabase(DB);
  } catch (error) {
    throw {
      status: error?.status || 500,
      message: error?.message || error,
    };
  }
};

const getRecordsForWorkout = (workoutId) => {
  try {
    const records = DB.records.filter(
      (record) => record.workout === workoutId
    );
    if (!records) {
      throw {
        status: 400,
        message: `Con't find workout with id ${workoutId}`,
      };
    }
    return records;
  } catch (error) {
    throw {
      status: error?.status || 500,
      message: error?.message || error,
    };
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
