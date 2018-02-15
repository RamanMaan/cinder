/**
 * These are the endpoints for user operations
 */
const express = require('express');
const router = express.Router();
const mysql = require('promise-mysql');
const util = require('./util');
const responses = require('./responses');

const MYSQLDB = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
};

router.post('/login', (req, res) => {
  res.status(responses.SUCCESS).json({ id: 1 });
});

router.get('/', (req, res) => {
  mysql.createConnection(MYSQLDB)
    .then((conn) => {
      const rows = conn.query('SELECT * FROM Users');
      conn.end();
      return rows;
    })
    .then((rows) => {
      res.status(responses.SUCCESS).json(rows);
    }).catch(err => console.error(err));
});

router.get('/:userID', (req, res) => {
  const { userID } = req.params;
  if (util.invalidID(userID)) {
    return res.status(responses.BAD_REQUEST).json({ response: 'Invalid user ID' });
  }

  return mysql.createConnection(MYSQLDB)
    .then((conn) => {
      const rows = conn.query('SELECT * FROM Users WHERE UserID = ?', [userID]);
      conn.end();
      return rows;
    })
    .then(rows => res.status(responses.SUCCESS).json(rows))
    .catch((err) => {
      console.error(err);
      return res.status(responses.SERVER_ERROR);
    });
});

router.get('/:userID/potentials', (req, res) => {
  const { userID } = req.params;
  if (util.invalidID(userID)) {
    return res.status(responses.BAD_REQUEST).json({ response: 'Invalid user ID' });
  }

  return mysql.createConnection(MYSQLDB)
    .then((conn) => {
      const query = mysql.format(`
      SELECT 
        UI.UserID AS userID,
        UI.UserName AS userName,
        TIMESTAMPDIFF(YEAR, UI.Birthday, CURDATE()) AS age,
        UP.PicturePath AS primaryPic
      FROM UsersInfo UI
        LEFT JOIN UserPicture UP
          ON UI.UserID = UP.UserID
          AND UP.PrimaryPicture
        LEFT JOIN Likes L
          ON UI.UserID = L.User2ID
          AND L.User1ID = ?
          AND L.UserAction = 'L'
        WHERE
          L.User2ID IS NULL
          AND UI.UserID != ?
     `, [userID, userID]);

      const rows = conn.query(query);
      conn.end();
      return rows;
    })
    .then(rows => res.status(responses.SUCCESS).json(rows))
    .catch((err) => {
      console.error(err);
      return res.status(responses.SERVER_ERROR);
    });
});

module.exports = router;
