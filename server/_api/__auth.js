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

function createTokenRes(resNum, userID) {
  const token = jwt.sign({ id: userID }, SECRET_KEY, { expiresIn: '1d' });
  return { status: resNum, token };
}

router.post('/login', (req, res, next) => {
  return usersDB.authenticateUser(req.body.email, req.body.password)
    .then(obj => {
      if (!obj.authenticated) {
        return res.status(responses.UNAUTHORIZED).json({
          status: responses.UNAUTHORIZED,
          err: obj.msg
        });
      } else {
        return res.status(responses.SUCCESS).json(
          createTokenRes(responses.SUCCESS, obj.userID));
      }
    })
    .catch(next);
});

router.post('/signup', (req, res, next) => {
  const newUser = req.body;
  return usersDB.getUserID(req.body.email)
    .then(obj => {
      if (obj.length) {
        return res.status(responses.UNAUTHORIZED).json({
          status: responses.UNAUTHORIZED,
          err: 'The email is already taken. Please try with another email.'
        });
      } else {
        return usersDB.createUser(newUser.email, newUser.password)
          .then(newID => newUser.userID = newID)
          .then(() => usersDB.saveUser(newUser))
          .then(() => res.status(responses.CREATED).json(
            createTokenRes(responses.CREATED, newUser.userID))
          );
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
