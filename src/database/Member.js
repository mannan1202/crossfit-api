const DB = require('./db.json');

const getOneMember = (memberId) => {
  try {
    const member = DB.members.find(
      (member) => member.id === memberId
    );
    if (!member) {
      throw {
        status: 400,
        message: `Can't the member with id ${memberId}`,
      };
    }
    return member;
  } catch (error) {
    throw {
      status: error?.status || 500,
      message: error?.message || error,
    };
  }
};

module.exports = {
  getOneMember,
};
