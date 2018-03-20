/**
 * The database access for users' recommendations
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
  getRecs(id) {
    return mysql.createConnection(MYSQLDB).then(conn => {
      const query = mysql.format(
        `
        SELECT 
          UI.UserID AS userID,
          UI.UserName AS userName,
          UI.GenderID AS genderID,
          TIMESTAMPDIFF(YEAR, UI.Birthday, CURDATE()) AS age,
          UP.PicturePath AS primaryPic,
          UI.Bio AS userBio 
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
        ORDER BY
          userID
        `,
        [id, id]
      );

      const rows = conn.query(query);
      conn.end();
      return rows;
    });
  }
};
