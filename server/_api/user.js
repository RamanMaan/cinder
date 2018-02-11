/**
 * This is the API endpoint for current user operations
 */
const express = require('express');

const router = express.Router();

const mysql = require('promise-mysql');

const MYSQLDB = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
};

const ID_REGEX = /^[0-9]*$/;

router.get('/', (req, res) => {
  mysql.createConnection(MYSQLDB)
    .then((conn) => {
      const rows = conn.query('SELECT * FROM Users');
      conn.end();
      return rows;
    })
    .then((rows) => {
      res.status(200).json(rows);
    }).catch(err => console.error(err));
});

router.get('/:userID', (req, res) => {
  const { userID } = req.params;
  if (!userID.match(ID_REGEX)) {
    return res.status(400).json({ response: 'Invalid user ID' });
  }

  return mysql.createConnection(MYSQLDB)
    .then((conn) => {
      const rows = conn.query('SELECT * FROM Users WHERE UserID = ?', [userID]);
      conn.end();
      return rows;
    })
    .then(rows => res.status(200).json(rows))
    .catch((err) => {
      console.error(err);
      return res.status(500);
    });
});

router.get('/:userID/potentials', (req, res) => {
  const { userID } = req.params;
  if (!userID.match(ID_REGEX)) {
    return res.status(400).json({ response: 'Invalid user ID' });
  }

  return mysql.createConnection(MYSQLDB)
    .then((conn) => {
      const query = mysql.format(`
      SELECT
        UInfo.UserID as userID,
        UInfo.UserName as userName
      FROM UsersInfo UInfo
        LEFT JOIN Likes
          ON (Likes.User1ID = ? AND UInfo.UserID = Likes.User2ID)
            OR (Likes.User2ID = ? AND UInfo.UserID = Likes.User1ID AND (Likes.UserAction = 0))
      WHERE
        Likes.User1ID IS NULL
        AND UInfo.UserID != ?
     `, [userID, userID, userID]);

      const rows = conn.query(query);
      conn.end();
      return rows;
    })
    .then(rows => res.status(200).json(rows))
    .catch((err) => {
      console.error(err);
      return res.status(500);
    });
});

router.post('/login', (req, res) => {
  res.status(200).json({ id: 1 });
});


router.get('/:userID/matches', (req, res) => {
  const { userID } = req.params;
  if (!userID.match(ID_REGEX)) {
    return res.status(400).json({ response: 'Invalid user ID' });
  }

  return mysql.createConnection(MYSQLDB)
    .then((conn) => {
      const rows = conn.query(`SELECT
                  UI.UserName AS userName,
                  UM2.UserID AS userID,
                  M.MatchDate AS matchDate,
                  UP.PicturePath AS primaryPic
              FROM UserMatches UM1
                  INNER JOIN UserMatches UM2
                      ON UM1.MatchID = UM2.MatchID
                  INNER JOIN Matches M
                      ON UM2.MatchID = M.MatchID
                  INNER JOIN UsersInfo UI
                      ON UM2.UserID = UI.UserID
                  LEFT JOIN UserPicture UP
                      ON UM2.UserID = UP.UserID
                      AND UP.PrimaryPicture
              WHERE
                  UM1.UserID != UM2.UserID
                  AND UM1.UserID = ?
              ORDER BY
                  M.MatchDate`, [userID]);

      conn.end();
      return rows;
    })
    .then(rows => res.status(200).json(rows))
    .catch(err => console.error(err));
});

module.exports = router;
