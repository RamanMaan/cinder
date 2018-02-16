/**
 * These are the endpoints for matches between users
 */
const express = require('express');
const router = express.Router({ mergeParams: true });
const matchesDB = require('./db/matches');
const util = require('./util');
const responses = require('./responses');

router.get('/', (req, res, next) => {
  const { userID } = req.params;
  util.validateID(userID);

  return matchesDB.getUserMatches(userID)
    .then(matches => res.status(responses.SUCCESS).json(matches))
    .catch(next);
});

router.get('/:matchUserID', (req, res, next) => {
  const { userID, matchUserID } = req.params;
  util.validateID([userID, matchUserID]);

  return matchesDB.getMatch(userID, matchUserID)
    .then(user => res.status(responses.SUCCESS).json(user[0]))
    .catch(next);
});

router.post('/:matchUserID/:action', (req, res, next) => {
  const { userID, matchUserID, action } = req.params;
  util.validateID([userID, matchUserID]);
  util.validateMatchAction(action);

  const userAction = action.match(/like/i) ? 'L' : 'P';

  return matchesDB.addUserSwipe(userID, matchUserID, userAction)
    .then(() => matchesDB.haveUsersMatched(userID, matchUserID))
    .then(result => res.status(responses.CREATED).json(result[0]))
    .catch(next);
});

/**
 * Error handler
 */
router.use((err, req, res, next) => {
  if(err.message.indexOf('[INTERNAL]')) {
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
