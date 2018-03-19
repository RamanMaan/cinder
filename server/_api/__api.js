const express = require('express');

const router = express.Router();

/**
 * Collection of different API endpoints organized by data model
 */
const userEndpoints = require('./__users');
const matchEndpoints = require('./__matches');
const recsEndpoints = require('./__recs');
const profileEndpoints = require('./__profile');
const refEndpoints = require('./__ref');
const tasks = require('./__tasks');

/**
 * Attach endpoints to route
 */
router.use('/users', userEndpoints);
router.use('/users/:userID/matches', matchEndpoints);
router.use('/users/:userID/recs', recsEndpoints);
router.use('/users/:userID/profile', profileEndpoints);
router.use('/ref', refEndpoints);
router.use('/', tasks);

module.exports = router;
