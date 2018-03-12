/**
 * These are the endpoints for user filter operations
 */
const express = require('express');
const router = express.Router({ mergeParams: true });
const filterDB = require('./db/filter');
const refData = require('../db/referenceData');
const util = require('./util');
const responses = require('./responses');

router.get('/', (req, res, next) => {
  const { userID } = req.params;
  util.validateID(userID);

  let filters = { age:null, gender:null, location: null };

  return filterDB
    .getAgeFilter(userID)
    .then(ageResult => {
      filters.age = ageResult;
      return filters;
    })
    .then(filters => {
      filters.gender = filterDB.getGenderFilter(userID);
      return filters;
    })
    .then(filters => res.status(responses.SUCCESS).json(filters))
    .catch(next);
});

router.post('/',(req, res, next) => {
  const {userID} = req.params;
  const {gender_filter_switch,
    gender_filter,
    age_filter_switch,
    age_min,
    age_max,
    distance_filter_swtich,
    distance_filter} = req.query;

  util.validateID(userID);
  util.validateFilterSwitch([
    gender_filter_switch,
    age_filter_switch,
    distance_filter_swtich
  ]);
  util.validateGenderFilter(gender_filter);
  util.validateAgeFilter([age_min, age_max]);
  util.validateDistanceFilter(distance_filter);

  let genderFilter = { state: 0, preference: [] };
  let ageFilter = { state: 0, minAge: 0, maxAge: 0 };
  // let distenceFilter = {state:0, distance:0};

  ageFilter.state = age_filter_switch.match(/T/i) ? 0 : 1;
  ageFilter.minAge = age_min;
  ageFilter.maxAge = age_max;

  genderFilter.state = gender_filter_switch.match(/T/i) ? 0 : 1;
  gender_filter.forEach(gender => {
    let genderPre = {genderID:0, genderName:null};
    genderPre.genderID = refData.GenderType.indexOf(gender);
    genderPre.genderName = gender;
    genderFilter.preference.push(genderPre);
  });

  // distenceFilter.state = distance_filter_swtich.match(/T/i) ? 0 : 1;
  // distenceFilter.distance = distance_filter;

  return (
    filterDB
      .saveGenderFilter(userID, genderFilter)
      .then(() => filterDB.saveAgeFilter(userID, ageFilter))
      // .then(() => filterDB.saveDistanceFilter(userID, distanceFilter))
      .then(result => res.status(responses.CREATED).json(result[0]))
      .catch(next)
  );
}
);

/**
 * Error handler
 */
router.use((err, req, res, next) => {
  if (err.message.indexOf('[INTERNAL]')) {
    //eslint-disable-next-line no-console
    console.error(err.message);
    return res.status(responses.BAD_REQUEST).send(err.message);
  }

  next(err);
});

router.use((err, req, res, next) => {
  //eslint-disable-next-line no-console
  console.error(err.message);
  res.status(responses.SERVER_ERROR).send(err.message);
});

module.exports = router;
