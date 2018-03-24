/**
 * The database access for matches
 * Note: all functions should return promises - error handling should be left to caller
 */

const mysql = require('promise-mysql');

const MYSQLDB = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
};

module.exports = {
  getUserMatches(userID) {
    return mysql.createConnection(MYSQLDB).then(conn => {
      const rows = conn.query(
        `
          SELECT 
            L1.User2ID AS userID,
            UI.UserName AS userName,
            UI.Bio as userBio,
            TIMESTAMPDIFF(YEAR, UI.Birthday, CURDATE()) AS userAge,
            GREATEST(L1.ActionDate, L2.ActionDate) AS matchDate,
            UP.PicturePath AS primaryPic
          FROM Likes L1 
            INNER JOIN Likes L2
              ON L1.User2ID = L2.User1ID
              AND L1.User1ID = L2.User2ID
            INNER JOIN UsersInfo UI
              ON L1.User2ID = UI.UserID
            LEFT JOIN UserPicture UP
              ON UI.UserID = UP.UserID
              AND UP.PrimaryPicture
          WHERE 
            L1.User1ID =  ?
            AND L1.UserAction = 'L'
            AND L2.UserAction = 'L'
          ORDER BY
            matchDate DESC
          `,
        [userID]
      );

      conn.end();
      return rows;
    });
  },

  getMatch(userID, matchUserID) {
    return mysql.createConnection(MYSQLDB).then(conn => {
      const query = mysql.format(
        `
          SELECT 
            L1.User2ID AS userID,
            UI.UserName AS userName,
            TIMESTAMPDIFF(YEAR, UI.Birthday, CURDATE()) AS userAge,
            GT.GenderType as userGender,
            UI.Bio as userBio,
            UP.PicturePath AS userPics,
            GREATEST(L1.ActionDate, L2.ActionDate) AS matchTime
          FROM Likes L1 
            INNER JOIN Likes L2
              ON L1.User2ID = L2.User1ID
              AND L1.User1ID = L2.User2ID
            INNER JOIN UsersInfo UI
              ON L1.User2ID = UI.UserID
            LEFT JOIN UserPicture UP
              ON UI.UserID = UP.UserID
              AND UP.PrimaryPicture
            INNER JOIN GenderType GT
              ON UI.GenderID = GT.GenderID
          WHERE 
            L1.User1ID =  ? 
            AND L1.User2ID = ?
            AND L1.UserAction = 'L'
            AND L2.UserAction = 'L';
          `,
        [userID, matchUserID]
      );

      const rows = conn.query(query);
      conn.end();
      return rows;
    });
  },

  addUserSwipe(userID, matchUserID, action) {
    return mysql.createConnection(MYSQLDB).then(conn => {
      let result = conn.query(
        `
          INSERT INTO Likes (User1ID, User2ID, UserAction)
          VALUES (?, ?, ?) 
          ON DUPLICATE KEY UPDATE UserAction = ?;
        `,
        [userID, matchUserID, action, action]
      );

      conn.end();
      return result;
    });
  },

  haveUsersMatched(user1ID, user2ID) {
    return mysql.createConnection(MYSQLDB).then(conn => {
      const result = conn.query(
        `
          SELECT IF(COUNT(*) = 2, 'true', 'false') AS matched
          FROM Likes
          WHERE (User1ID = ? AND User2ID = ? AND UserAction = 'L')
          OR (User1ID = ? AND User2ID = ? AND UserAction = 'L')
        `,
        [user1ID, user2ID, user2ID, user1ID]
      );
      conn.end();
      return result;
    });
  }
};
