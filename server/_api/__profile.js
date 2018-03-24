/**
 * These are the endpoints for user filter operations
 */
const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router({ mergeParams: true });
const usersDB = require('./db/users');
const filterDB = require('./db/filters');
const util = require('./util');
const responses = require('./responses');

router.use(bodyParser.json());

router.get('/', (req, res, next) => {
  const { userID } = req.params;
  util.validateID(userID);

  let profile = { 
    name: null,
    birthday: null,
    bio: null,
    filters: 
    { 
      age: null, 
      gender: null 
    } 
  };

  return filterDB
    .getAgeFilter(userID)
    .then(ageResult => {
      profile.filters.age = ageResult;
    })
    .then(() => filterDB.getGenderFilter(userID))
    .then(genderResult => {
      profile.filters.gender = genderResult;
    })
    .then(() => usersDB.getUser(userID))
    .then(userInfo => {
      profile.name = userInfo.userName;
      profile.birthday = userInfo.birthday;
      profile.bio = userInfo.userBio;
    })
    .then(() => res.status(responses.SUCCESS).json(profile))
    .catch(next);
});

router.post('/', (req, res, next) => {
  const { userID } = req.params;
  util.validateID(userID);

  return filterDB
    .saveGenderFilter(userID, req.body.filters.gender)
    .then(() => filterDB.saveAgeFilter(userID, req.body.filters.age))
    .then(result => res.status(responses.CREATED).json(result[0]))
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
