/**
 * The database access for recommendations
 * Note: all functions should return promises - error handling should be left to caller
 */

const mysql = require('promise-mysql');

const MYSQLDB = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
};

module.exports = {
  getUserRecommendations(id) {
    return mysql.createConnection(MYSQLDB)
      .then((conn) => {
        const query = mysql.format(`
        SELECT 
          UI.UserID AS userID,
          UI.UserName AS userName,
          TIMESTAMPDIFF(YEAR, UI.Birthday, CURDATE()) AS age,
          UP.PicturePath AS primaryPic,
          UI.Bio AS userBio
        FROM UsersInfo UI
          LEFT JOIN UserPicture UP
            ON UI.UserID = UP.UserID
            AND UP.PrimaryPicture
          INNER JOIN (
            SELECT 
              UI2.UserID as UserID
            FROM UsersInfo UI2
              LEFT JOIN AgeFilter AF
                ON AF.UserID = ?
              LEFT JOIN Likes L
                ON UI2.UserID = L.User2ID
                AND L.User1ID = ?
                AND L.UserAction = 'L'
            WHERE
              UI2.Birthday BETWEEN DATE(NOW()-INTERVAL COALESCE(AF.MaxAge, 150) YEAR) AND DATE(NOW()-INTERVAL COALESCE(AF.MinAge, 18) YEAR)
              AND L.User2ID IS NULL
              AND UI2.UserID != ?
            ) Filter
            ON UI.UserID = Filter.UserID
        `, [id, id, id]);

        const rows = conn.query(query);
        conn.end();
        return rows;
      });
  }
};
