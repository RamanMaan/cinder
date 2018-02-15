/**
 * These are the endpoints for reference tables
 */
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json({ id: 1 });
});

module.exports = router;
