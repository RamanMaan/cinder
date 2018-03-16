const express = require('express');

const router = express.Router();
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
 * 
 * Token authentication middleware is inside login route
 * Put endpoints that require authentication below this
 */
router.use('/', login);

// Endpoints that require token authentication
router.use('/users', userEndpoints);
router.use('/users/:userID/matches', matchEndpoints);
router.use('/users/:userID/recs', recsEndpoints);
router.use('/ref', refEndpoints);
// router.use('/', tasks);

module.exports = router;
