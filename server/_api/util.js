const ID_REGEX = /^[0-9]*$/;

const MATCH_ACTION_REGEX = /(like|pass)/i;

module.exports = {
  validateID(id) {
    let ids = [].concat(id);
    ids.forEach(id => {
      if (!id.match(ID_REGEX)) {
        throw new Error(`[INTERNAL]: Invalid User ID: ${id}`);
      }
    });
  },

  validateMatchAction(action) {
    if (!action.match(MATCH_ACTION_REGEX)) {
      throw new Error(`[INTERNAL]: Invalid Match Action: ${action}`);
    }
  },
};
