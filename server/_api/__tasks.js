/**
 * These are the endpoints for server tasks
 */
const express = require('express');
const router = express.Router();
const responses = require('./responses');

router.post('/login', (req, res) => {
  res.status(responses.SUCCESS).json({ id: 1 });
});

router.post('/signup', (req, res) => {
  res.status(responses.SUCCESS).json({ id: 1 });
});

module.exports = router;
