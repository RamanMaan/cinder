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

  return usersDB.getUser(userID)
    .then(user => {
      user.filters = {};
      return filterDB.getAgeFilter(userID)
        .then(ageFilter => user.filters.age = ageFilter)
        .then(() => filterDB.getGenderFilter(userID))
        .then(genderFilter => user.filters.gender = genderFilter)
        .then(() => user);
    })
    .then(user => res.status(responses.SUCCESS).json(user))
    .catch(next);
});

router.post('/', (req, res, next) => {
  const { userID } = req.params;
  util.validateID(userID);

  return usersDB.saveUser(req.body)
    .then(() => req.body.filters.age ? filterDB.saveAgeFilter(userID, req.body.filters.age) : null)
    .then(() => req.body.filters.gender ? filterDB.saveGenderFilter(userID, req.body.filters.gender) : null)
    .then(result => {
      return res.status(responses.CREATED).json(result);
    })
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
