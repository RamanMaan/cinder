/**
 * These are the endpoints for user operations
 */
const express = require('express');
const router = express.Router();
const usersDB = require('./db/users');
const util = require('./util');
const responses = require('./responses');

router.post('/login', (req, res) => {
  res.status(responses.SUCCESS).json({ id: 1 });
});

router.get('/', (req, res, next) => {
  return usersDB.getUsers()
    .then((users) => res.status(responses.SUCCESS).json(users))
    .catch(next);
});

router.get('/:userID', (req, res, next) => {
  const { userID } = req.params;
  if (util.invalidID(userID)) {
    return res.status(responses.BAD_REQUEST).json({ response: 'Invalid user ID' });
  }

  return usersDB.getUser(userID)
    .then(user => res.status(responses.SUCCESS).json(user))
    .catch(next);
});

router.get('/:userID/potentials', (req, res, next) => {
  const { userID } = req.params;
  if (util.invalidID(userID)) {
    return res.status(responses.BAD_REQUEST).json({ response: 'Invalid user ID' });
  }

  return usersDB.getUserPotentials(userID)
    .then(rows => res.status(responses.SUCCESS).json(rows))
    .catch(next);
});

/**
 * Error handler
 */
router.use((err, req, res, next) => {
  //eslint-disable-next-line no-console
  console.error(err.message);
  res.status(responses.SERVER_ERROR).send(err.message);
});

module.exports = router;
