/**
 * These are the endpoints for user operations
 */
const express = require('express');
const router = express.Router();
const usersDB = require('./db/users');
const util = require('./util');
const responses = require('./responses');

router.get('/', (req, res, next) => {
  return usersDB
    .getUsers()
    .then(users => res.status(responses.SUCCESS).json(users))
    .catch(next);
});

router.get('/:userID', (req, res, next) => {
  const { userID } = req.params;
  util.validateID(userID);

  return usersDB
    .getUser(userID)
    .then(user => res.status(responses.SUCCESS).json(user[0]))
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
