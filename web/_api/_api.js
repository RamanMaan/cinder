const express = require('express');
const router = express.Router();

/**
 * Collection of different API endpoints organized by data model
 */
const user_endpoints = require('../_api/user.js');

/**
 * Attach endpoints to route
 */
router.use('/user', user_endpoints);

module.exports = router;
