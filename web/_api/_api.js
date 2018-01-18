const express = require('express');

const router = express.Router();

/**
 * Collection of different API endpoints organized by data model
 */
const userEndpoints = require('../_api/user.js');

/**
 * Attach endpoints to route
 */
router.use('/user', userEndpoints);

module.exports = router;
