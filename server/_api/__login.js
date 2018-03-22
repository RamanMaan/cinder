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
  return usersDB.getUserID(req.body.email)
    .then(obj => {
      if (obj.length === 0)
        return res.status(responses.UNAUTHORIZED).json({
          status: responses.UNAUTHORIZED,
          err: `We couldn't find any user registered with ${req.body.email}.` +
            'You can register with us by signing up first'
        });
      else if (obj[0].UserPassword !== req.body.password)
        return res.status(responses.UNAUTHORIZED).json({
          status: responses.UNAUTHORIZED,
          err: 'Your password is incorrect. Please try again.'
        });
      else {
        const token = jwt.sign({ id: obj[0].UserID }, SECRET_KEY, { expiresIn: '1d' });
        return res.status(responses.SUCCESS).json({
          status: responses.SUCCESS,
          token
        });
      }
    })
    .catch(next);
});

// middleware to protect other api endpoints
router.use((req, res, next) => {
  const bearerHeader = req.headers['authorization'];
  if (bearerHeader) {
    const token = bearerHeader.split(' ')[1];
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.status(responses.UNAUTHORIZED).json({
          status: responses.UNAUTHORIZED,
          err: 'Authentication failed. User not found'
        });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    return res.status(responses.FORBIDDEN).json({
      status: responses.FORBIDDEN,
      err: 'No token provided'
    });
  }
});

module.exports = router;
