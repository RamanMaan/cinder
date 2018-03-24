/**
 * These are the endpoints for user recommendation operations
 */
const express = require('express');
const router = express.Router({ mergeParams: true });
const recsDB = require('./db/recs');
const filterDB = require('./db/filters');
const util = require('./util');
const responses = require('./responses');

const ageFilterFunc = (user, recs) => {
  return filterDB.getAgeFilter(user)
    .then(result => {
      if(result && result.state) {
        recs = recs.filter(x => x.age >= result.minAge && x.age <= result.maxAge);
      }
      return recs;
    });
};

const genderFilterFunc = (user, recs) => {
  return filterDB.getGenderFilter(user)
    .then(result => {
      if(result && result.state) {
        recs = recs.filter(x => result.preference.some(gender => gender.genderID === x.genderID));
      }
      return recs;
    });
};

router.get('/', (req, res, next) => {
  const { userID } = req.params;
  util.validateID(userID);


  return recsDB.getRecs(userID)
    .then(result => genderFilterFunc(userID, result))
    .then(result => ageFilterFunc(userID, result))
    .then(result => res.status(responses.SUCCESS).json(result))
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
