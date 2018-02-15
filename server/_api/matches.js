/**
 * These are the endpoints for matches between users
 */
const express = require('express');
const router = express.Router({ mergeParams: true });
const mysql = require('promise-mysql');
const util = require('./util');
const responses = require('./responses');

const MYSQLDB = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
};

router.get('/', (req, res) => {
  const { userID } = req.params;
  if (util.invalidID(userID)) {
    return res.status(responses.BAD_REQUEST).json({ response: 'Invalid user ID' });
  }

  return mysql.createConnection(MYSQLDB)
    .then((conn) => {
      const rows = conn.query(`
      SELECT 
        L1.User2ID AS userID,
        UI.UserName AS userName,
        GREATEST(L1.ActionDate, L2.ActionDate) AS matchDate,
        UP.PicturePath AS primaryPic
      FROM Likes L1 
        INNER JOIN Likes L2
          ON L1.User2ID = L2.User1ID
        INNER JOIN UsersInfo UI
          ON L1.User2ID = UI.UserID
        LEFT JOIN UserPicture UP
          ON UI.UserID = UP.UserID
          AND UP.PrimaryPicture
      WHERE 
        L1.User1ID =  ? 
        AND L2.User2ID =  ? 
        AND L1.UserAction = 'L'
        AND L2.UserAction = 'L'
      ORDER BY
        matchDate
      `, [userID, userID]);

      conn.end();
      return rows;
    })
    .then(rows => res.status(responses.SUCCESS).json(rows))
    .catch(err => console.error(err));
});

router.get('/:matchUserID', (req, res) => {
  const { userID, matchUserID } = req.params;
  if (util.invalidID(userID) || util.invalidID(matchUserID)) {
    return res.status(responses.BAD_REQUEST).json({ response: 'Invalid User ID' });
  }

  return mysql.createConnection(MYSQLDB)
    .then((conn) => {
      const query = mysql.format(`
      SELECT
        UInfo.UserName as userName,
        UInfo.UserID as userID,
        TIMESTAMPDIFF(YEAR, UInfo.Birthday, CURDATE()) AS userAge,
        Gender.GenderType as userGender,
        UInfo.Bio as userBio,
        Pics.PicturePath AS userPics,
        Matches.MatchDate AS matchTime
      FROM UsersInfo UInfo
        LEFT JOIN UserPicture Pics
          ON UInfo.UserID = Pics.UserID AND Pics.PrimaryPicture
        INNER JOIN GenderType Gender
          ON UInfo.GenderID = Gender.GenderID
        INNER JOIN (
          SELECT 
            Likes.User1ID as CurrentUserID,
            Likes.ActionDate as MatchDate
           FROM Likes
          WHERE (User1ID = ? AND User2ID = ? AND UserAction = 'L')) AS Matches       
          ON UInfo.UserID = Matches.CurrentUserID
    WHERE
      UInfo.UserID = ?
      `, [matchUserID, userID, matchUserID]);

      const rows = conn.query(query);
      conn.end();
      return rows;
    }).then(rows => res.status(responses.SUCCESS).json(rows))
    .catch(err => console.error(err));
});

router.post('/:matchUserID/:action', (req, res) => {
  const { userID, matchUserID, action } = req.params;

  if (util.invalidID(userID)) {
    return res.status(responses.BAD_REQUEST).json({ response: 'Invalid user ID' });
  }
  if (util.invalidID(matchUserID)) {
    return res.status(responses.BAD_REQUEST).json({ response: 'Invalid match user ID' });
  }
  if (util.invalidMatchAction(action)) {
    return res.status(responses.BAD_REQUEST).json({ response: 'Invalid match action' });
  }

  const userAction = action.match(/like/i) ? 'L' : 'P';
  let connection;

  return mysql.createConnection(MYSQLDB)
    .then((conn) => {
      const insert = mysql.format(`
      INSERT INTO Likes (User1ID, User2ID, UserAction)
      VALUES (?, ?, ?) 
      ON DUPLICATE KEY UPDATE UserAction = ?;
      `, [userID, matchUserID, userAction, userAction]);

      connection = conn;

      return conn.query(insert);
    })
    .then((rows) => {
      const checkMatchQuery = mysql.format(`
      SELECT IF(COUNT(*) = 2, 'True', 'False') AS IsMatched
      FROM Likes
      WHERE (User1ID = ? AND User2ID = ? AND UserAction = 'L')
      OR (User1ID = ? AND User2ID = ? AND UserAction = 'L')
      `, [userID, matchUserID, matchUserID, userID]);

      const result = connection.query(checkMatchQuery);
      connection.end();
      return result;
    })
    .then(rows => res.status(responses.SUCCESS).json(rows))
    .catch((err) => {
      if (connection && connection.end) connection.end();
      console.error(err);
      return res.status(responses.SERVER_ERROR);
    });

});


module.exports = router;
