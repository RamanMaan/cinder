const express = require('express');

const router = express.Router();

/**
 * Collection of different API endpoints organized by data model
 */
const userEndpoints = require('../_api/user.js');

const matchEndpoints = require('../_api/match.js');

/**
 * Attach endpoints to route
 */
router.use('/users', userEndpoints);

router.use('/matches', matchEndpoints);

module.exports = router;
