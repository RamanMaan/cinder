/**
 * These are the endpoints for reference tables
 */
const express = require('express');
const router = express.Router();
const responses = require('./responses');

router.get('/', (req, res) => {
  res.status(responses.SUCCESS).json({ id: 1 });
});

module.exports = router;
