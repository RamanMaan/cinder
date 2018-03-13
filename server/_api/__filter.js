/**
 * These are the endpoints for user filter operations
 */
const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router({ mergeParams: true });
const filterDB = require('./db/filters');
const refData = require('../db/referenceData');
const util = require('./util');
const responses = require('./responses');

router.use(bodyParser.json());

router.get('/', (req, res, next) => {
  const { userID } = req.params;
  util.validateID(userID);

  let filters = { age:null, gender:null };

  return filterDB.getAgeFilter(userID)
    .then(ageResult => {
      filters.age = ageResult;
    })
    .then(() => filterDB.getGenderFilter(userID))
    .then(genderResult => {
      filters.gender = genderResult;
    })
    .then(() => res.status(responses.SUCCESS).json(filters))
    .catch(next);
});

router.post('/', (req, res, next) => {
  const {userID} = req.params;
  util.validateID(userID);

  const filters = req.body;

  util.validateFilters(filters);

  let genderFilter = { state: 0, preference: [] };
  let ageFilter = filters.age;
  const genderPref = filters.gender.preference;

  ageFilter.state = JSON.stringify(ageFilter.state).match(/T/i) ? 1 : 0;

  genderFilter.state = JSON.stringify(filters.gender.state).match(/T/i) ? 1 : 0;
  genderPref.forEach(gender => {
    let genderPre = {genderID:0, genderName:null};
    genderPre.genderID = refData.GenderType.indexOf(gender)+1;
    genderPre.genderName = gender;
    genderFilter.preference.push(genderPre);
  });

  return (
    filterDB
      .saveGenderFilter(userID, genderFilter)
      .then(() => filterDB.saveAgeFilter(userID, ageFilter))
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
