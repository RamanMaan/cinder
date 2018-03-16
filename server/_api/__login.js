/**
 * These are the endpoints for user operations
 */
const express = require('express');
const router = express.Router();
const usersDB = require('./db/users');
const jwt = require('jsonwebtoken');
const responses = require('./responses');
require('dotenv').load();

const SECRET_KEY = process.env.SECRET_KEY || 'cinder_token';

router.post('/login', (req, res, next) => {
  return usersDB.getUserID(req.body.email, req.body.password)
    .then(obj => {
      if (obj.length === 0)
        return res.status(responses.UNAUTHORIZED).json({
          err: 'Authentication failed. User not found'
        });
      else {
        const token = jwt.sign({ id: obj[0].UserID }, SECRET_KEY, { expiresIn: '1h' });
        return res.status(responses.SUCCESS).json({
          token
        });
      }
    })
    .catch(next);
});

// middleware to protect other api endpoints
router.use((req, res, next) => {
  const token = req.body.token || req.query.token || req.headers['x-access-token'];

  if (token) {
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.status(responses.UNAUTHORIZED).json({
          err: 'Authentication failed. User not found'
        });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    return res.status(responses.FORBIDDEN).json({
      err: 'No token provided'
    });
  }
});

module.exports = router;
