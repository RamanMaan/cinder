/**
 * These are the endpoints for user recommendation operations
 */
const express = require('express');
const router = express.Router({ mergeParams: true });
const recsDB = require('./db/recs');
const filterDB = require('./db/filters');
const util = require('./util');
const responses = require('./responses');

router.get('/', (req, res, next) => {
  const { userID } = req.params;
  util.validateID(userID);

  let allRecs;
  let prefGender, recsGenderFiltered;
  let prefAge, recsAgeFiltered;

  return recsDB
    .getRecs(userID)
    .then(recs => {
      allRecs = recs;
    })
    .then(() => filterDB.getGenderFilter(userID))
    .then(genderResult => {
      if (genderResult && genderResult.state) {
        prefGender = genderResult.preference.map(x => {
          return x.genderID;
        });
        recsGenderFiltered = allRecs.filter(x =>
          prefGender.some(genderID => genderID === x.genderID)
        );
      } else {
        recsGenderFiltered = allRecs;
      }
      return recsGenderFiltered;
    })
    .then(() => filterDB.getAgeFilter(userID))
    .then(ageResult => {
      if (ageResult && ageResult.state) {
        recsAgeFiltered = recsGenderFiltered.filter(
          x => x.age >= ageResult.minAge && x.age <= ageResult.maxAge
        );
      } else {
        recsAgeFiltered = recsGenderFiltered;
      }
      return recsAgeFiltered;
    })
    .then(recs => res.status(responses.SUCCESS).json(recs))
    .catch(next);
});

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
