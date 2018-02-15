const ID_REGEX =  /^[0-9]*$/;

const MATCH_ACTION_REGEX = /(like|pass)/i;

module.exports = {
  invalidID(id) {
    return !id.match(ID_REGEX);
  },

  invalidMatchAction(action) {
    return !action.match(MATCH_ACTION_REGEX);
  }
};
