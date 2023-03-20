const Member = require('../database/Member');

const getOneMember = (memberId) => {
  try {
    return Member.getOneMember(memberId);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getOneMember,
};
