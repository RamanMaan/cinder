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

/**
 * Error handler
 */
router.use((err, req, res, next) => {
  if (err.message.indexOf('[INTERNAL]')) {
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
