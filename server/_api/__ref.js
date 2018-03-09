/**
 * These are the endpoints for reference tables
 */
const express = require('express');
const router = express.Router();
const refDB = require('./db/ref');
const responses = require('./responses');

router.get('/', (req, res) => {
  res.status(responses.SUCCESS).json({ id: 1 });
});

router.get('/gender', (req, res, next) => {
  return refDB
    .getGender()
    .then(gender => res.status(responses.SUCCESS).json(gender))
    .catch(next);
});

module.exports = router;
