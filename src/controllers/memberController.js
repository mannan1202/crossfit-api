const memberService = require('../services/memberService');

const getOneMember = (req, res) => {
  try {
    const { params: memberId } = req;
    if (!memberId) {
      throw {
        status: 400,
        message: `Parameter ':memberId' can't be empty`,
      };
    }
    const member = memberService.getOneMember(memberId);
    res.send({ status: 'OK', data: member });
  } catch (error) {
    res.status(error?.status || 500).send({
      status: 'FAILED',
      data: { error: error?.message || error },
    });
  }
};

module.exports = {
  getOneMember,
};
