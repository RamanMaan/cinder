/**
 * The database access for reference tables
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
  getGender() {
    return mysql.createConnection(MYSQLDB).then(conn => {
      const rows = conn.query(`
          SELECT 
            GT.GenderID AS genderID, 
            GT.GenderType AS genderName 
          FROM GenderType GT
          ORDER BY genderID;
          `);
      conn.end();
      return rows;
    });
  },

  getEducation() {
    return mysql.createConnection(MYSQLDB).then(conn => {
      const rows = conn.query(`
          SELECT 
            ET.EducationID AS educationID, 
            ET.EducationType AS educationName
          FROM EducationType ET
          ORDER BY educationID;
          `);
      conn.end();
      return rows;
    });
  }
};
