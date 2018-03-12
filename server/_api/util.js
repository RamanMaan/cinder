const ID_REGEX = /^[0-9]*$/;

const MATCH_ACTION_REGEX = /(like|pass)/i;

const FILTER_SWITCH_REGEX = /T|F/i;

const GENDER_FILTER_REGEX = /Male|Female|Other/i;

const AGE_FILTER_REGEX = /^\d+$/;

const DISTANCE_FILTER_REGEX = /^[0-9]+(\.[0-9]{1,2})?$/;

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

  validateFilterSwitch(filterSwitch) {
    let filterSwitches = [].concat(filterSwitch);
    filterSwitches.forEach(filterSwitch => {
      if (!filterSwitch.match(FILTER_SWITCH_REGEX)) {
        throw new Error(
          `[INTERNAL]: Invalid Filter Switch Condition: ${filterSwitch}`
        );
      }
    });
  },

  validateGenderFilter(genderFilter) {
    let genderFilters = genderFilter.split(',');
    genderFilters.forEach(genderFilter => {
      if (!genderFilter.match(GENDER_FILTER_REGEX)) {
        throw new Error(`[INTERNAL]: Invalid Gender Filter: ${genderFilter}`);
      }
    });
  },

  validateAgeFilter(ageFilter) {
    let ageFilters = [].concat(ageFilter);
    ageFilters.forEach(ageFilter => {
      if (!ageFilter.match(AGE_FILTER_REGEX)) {
        throw new Error(`[INTERNAL]: Invalid Age Filter: ${ageFilter}`);
      }
    });
  },

  validateDistanceFilter(distanceFilter) {
    if (!distanceFilter.match(DISTANCE_FILTER_REGEX)) {
      throw new Error(`[INTERNAL]: Invalid Distance Filter: ${distanceFilter}`);
    }
  }
};
