/**
 * These are the endpoints for user operations
 */
const express = require('express');
const router = express.Router();
const usersDB = require('./db/users');
const jwt = require('jsonwebtoken');
const responses = require('./responses');
const util = require('./util');
const SECRET_KEY = util.SECRET_KEY;

router.post('/', (req, res) => {
  return usersDB.getUserID(req.body.email, req.body.password)
    .then(obj => {

      if (obj.length === 0)
        return res.status(responses.UNAUTHORIZED).send('Authentication failed. User not found');
      else {
        const token = jwt.sign({ id: obj[0].UserID }, SECRET_KEY, { expiresIn: '1h' });
        return res.status(responses.SUCCESS).json(token);
      }
    })
    .catch(err => console.log(err));
});

module.exports = router;
