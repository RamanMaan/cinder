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
    user.filter = {};
    return filterDB.getAgeFilter(userID)
    .then(ageFilter => user.filter.ageFilter = ageFilter)
    .then(() => filterDB.getGenderFilter(userID))
    .then(genderFilter => user.filter.genderFilter = genderFilter)
    .then(() => user);
  })
  .then(user => res.status(responses.SUCCESS).json(user))
  .catch(next);
});

router.post('/', (req, res, next) => {
  const {userID} = req.params;
  util.validateID(userID);

  return (
    filterDB
      .saveGenderFilter(userID, req.body.filters.gender)
      .then(() => filterDB.saveAgeFilter(userID, req.body.filters.age))
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
