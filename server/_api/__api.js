const express = require('express');

const router = express.Router();
const jwt = require('jsonwebtoken');
const responses = require('./responses');
const util = require('./util');
const SECRET_KEY = util.SECRET_KEY;
/**
 * Collection of different API endpoints organized by data model
 */
const userEndpoints = require('./__users');
const matchEndpoints = require('./__matches');
const recsEndpoints = require('./__recs');
const refEndpoints = require('./__ref');
// const tasks = require('./__tasks');

const login = require('./__login');
/**
 * Attach endpoints to route
 */

// this doesn't need protection
router.use('/login', login);

// middleware to protect other api endpoints
router.use((req, res, next) => {
  const token = req.body.token || req.query.token || req.headers['x-access-token'];

  if (token) {
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.status(responses.UNAUTHORIZED).send('Authentication failed. User not found');
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    return res.status(responses.FORBIDDEN).send('No token provided');
  }
});

router.use('/users', userEndpoints);
router.use('/users/:userID/matches', matchEndpoints);
router.use('/users/:userID/recs', recsEndpoints);
router.use('/ref', refEndpoints);
// router.use('/', tasks);

module.exports = router;
