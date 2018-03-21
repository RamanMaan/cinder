/**
 * The database access for users
 * Note: all functions should return promises - error handling should be left to caller
 */

const mysql = require('promise-mysql');

const MYSQLDB = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
};

const createUserObject = (rows) => {
  var user = null;
  var educationIndex = interestIndex = {};

  rows.forEach((row) => {
    if (!user) {
      user = {
        userID: row.userID,
        userName: row.userName,
        userAge: row.userAge,
        userBirthday: row.userBirthday,
        userBio: row.userBio,
        primaryPic: row.primaryPic,
        gender: { genderID: row.genderID, genderName: row.genderName },
        religion: { religionID: row.religionID, religionName: row.religionName },
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

  createUser(userEmail, userPassword) {
    
  },

  getUser(id) {
    return mysql.createConnection(MYSQLDB).then(conn => {
      const result = conn.query(`
      SELECT
        UI.UserID AS userID,
        UI.UserName AS userName,
        UI.Birthday AS userBirthday,
        UI.Bio AS userBio,
        GT.GenderID AS genderID,
        GT.GenderType AS genderName,
        UP.PicturePath AS primaryPic,
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
        educationName,
        interestName;
      `, [id])
      .then(rows => createUserObject(rows));
      conn.end();
      return result;
    });
  },

  saveUser(id, user) {
    const insertUsersInfoQuery = mysql.format(`
    INSERT INTO UsersInfo (UserID, UserName, UserBirthday, UserBio, GenderID, ReligionID) VALUES (?, ?, ?, ?, ?, ?);`, 
    [user.userID, user.userName, user.userBirthday, user.userBio, user.gender.genderID, user.religion.religionID]);

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
      .then(() => conn.query(insertUserEducationQuery))
      .then(() => conn.query(deleteUserInterestsQuery))
      .then(() => conn.query(insertUserInterestsQuery))
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
