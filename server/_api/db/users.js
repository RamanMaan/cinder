/**
 * The database access for users
 * Note: all functions should return promises - error handling should be left to caller
 */

const mysql = require('promise-mysql');
const bcrypt = require('bcrypt');

const MYSQLDB = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
};

const createUserObject = (rows) => {
  var user = null;
  var educationIndex = {}, interestIndex = {};
  
  rows.forEach((row) => {
    if (!user) {
      user = {
        userID: row.userID,
        name: row.name,
        age: row.age,
        birthday: row.birthday.toISOString().split('T')[0],
        bio: row.bio,
        img: row.img,
        genderID: row.genderID,
        genderName: row.genderName,
        religionID: row.religionID,
        religionName: row.religionName,
        education: [],
        interests: []
      };
    }
    
    if (row.educationID && !(row.educationID in educationIndex)) {
      educationIndex[row.educationID] = { 
        educationID: row.educationID, 
        educationName: row.educationName 
      };
      user.education.push(educationIndex[row.educationID]);
    }

    if (row.interestID && !(row.interestID in interestIndex)) {
      interestIndex[row.interestID] = {
        interestID: row.interestID,
        interestName: row.interestName
      };
      user.interests.push(interestIndex[row.interestID]);
    }
  });

  return user;
}

module.exports = {
  getUsers() {
    return mysql.createConnection(MYSQLDB).then(conn => {
      const rows = conn.query('SELECT * FROM UsersInfo');
      conn.end();
      return rows;
    });
  },

  getUserID(email) {
    return mysql.createConnection(MYSQLDB).then(conn => {
      const rows = conn.query('SELECT * FROM Users WHERE UserEmail = ?', [email]);
      conn.end();
      return result;
    });
  },

  authenticateUser(email, password) {
    const query = mysql.format(`
    SELECT 
      UserEmail AS email,
      UserPassword AS password
    FROM Users
    WHERE UserEmail = ?;
    `, [email]);

    return mysql.createConnection(MYSQLDB)
    .then(conn => {
      const result = conn.query(query)
      .then(rows => {
        if (!rows.length) {
          return { 
            authenticated: false, 
            msg: `We couldn't find any user registered with ${email}. Please register with us by signing up first.`
          };
        }
        return bcrypt.compare(password, rows[0].password)
        .then(res => {
          return {
            authenticated: res,
            msg: res ? `Login Successful.` : `Your password is incorrect. Please try again.`
          };
        });
      });

      conn.end();
      return result;
    });
  },

  createUser(email, password) {
    const query = `INSERT INTO Users (UserEmail, UserPassword) VALUES (?, ?);`;
    const saltRounds = 12;

    return mysql.createConnection(MYSQLDB)
    .then(conn => {
      return bcrypt.hash(password, saltRounds)
      .then(hash => {
        return conn.query(query, [email, hash])
        .then(res => {
          conn.end();
          return res.insertId;
        })
        .catch((err) => {
          conn.end();
          throw err;
        })
      });
    });
  },

  getUser(id) {
    return mysql.createConnection(MYSQLDB).then(conn => {
      const result = conn.query(`
      SELECT
        UI.UserID AS userID,
        UI.UserName AS name,
        TIMESTAMPDIFF(YEAR, UI.Birthday, CURDATE()) AS age,
        UI.Birthday AS birthday,
        UI.Bio AS bio,
        GT.GenderID AS genderID,
        GT.GenderType AS genderName,
        UP.PicturePath AS img,
        RT.ReligionID AS religionID,
        RT.ReligionType AS religionName,
        ET.EducationID AS educationID,
        ET.EducationType AS educationName,
        IT.InterestID AS interestID,
        IT.InterestType AS interestName
      FROM UsersInfo UI
        INNER JOIN GenderType GT
          ON UI.GenderID = GT.GenderID
        LEFT JOIN UserPicture UP
          ON UI.UserID = UP.UserID
          AND UP.PrimaryPicture
        LEFT JOIN ReligionType RT
          ON UI.ReligionID = RT.ReligionID
        LEFT JOIN UserEducation UE
          ON UI.UserID = UE.UserID
        LEFT JOIN EducationType ET
          ON UE.EducationID = ET.EducationID
        LEFT JOIN UserInterests UINT
          ON UI.UserID = UINT.UserID
        LEFT JOIN InterestsType IT
          ON UINT.InterestID = IT.InterestID
      WHERE
        UI.UserID = ?
      ORDER BY
        educationID,
        interestID;
      `, [id])
      .then(rows => createUserObject(rows));
      conn.end();
      return result;
    });
  },
  
  saveUser(user) {
    const insertUsersInfoQuery = mysql.format(`
    INSERT INTO UsersInfo (UserID, UserName, Birthday, Bio, GenderID, ReligionID) VALUES (?, ?, ?, ?, ?, ?) 
    ON DUPLICATE KEY UPDATE UserName = ?, Birthday = ?, Bio = ?, GenderID = ?, ReligionID = ?;`, 
    [user.userID, user.name, user.birthday, user.bio, user.genderID, user.religionID,
      user.name, user.birthday, user.bio, user.genderID, user.religionID]);

    const deleteUserEducationQuery = mysql.format(`
    DELETE FROM UserEducation WHERE UserID = ?;`, [user.userID]);

    var insertUserEducationQuery = null;
    if (user.education && user.education.length) {
      insertUserEducationQuery = `INSERT INTO UserEducation (UserID, EducationID) VALUES ` + 
      user.education.map(x => mysql.format(` (?, ?) `, [user.userID, x.educationID])).join(`, `) + `;`;
    }
    
    const deleteUserInterestsQuery = mysql.format(`
    DELETE FROM UserInterests WHERE UserID = ?;`, [user.userID]);

    var insertUserInterestsQuery = null;
    if (user.interests && user.interests.length) {
      insertUserInterestsQuery = `INSERT INTO UserInterests (UserID, InterestID) VALUES ` +
      user.interests.map(x => mysql.format(` (?, ?) `, [user.userID, x.interestID])).join(`, `) + `;`;
    }

    return mysql.createConnection(MYSQLDB)
    .then((conn) => {
      return conn.beginTransaction()
      .then(() => conn.query(insertUsersInfoQuery))
      .then(() => conn.query(deleteUserEducationQuery))
      .then(() => insertUserEducationQuery ? conn.query(insertUserEducationQuery) : null)
      .then(() => conn.query(deleteUserInterestsQuery))
      .then(() => insertUserInterestsQuery ? conn.query(insertUserInterestsQuery) : null)
      .then(() => conn.commit())
      .then(() => conn.end())
      .catch((err) => {
        conn.rollback();
        conn.end();
        throw err;
      });
    });
  },
};
