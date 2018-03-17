/**
 * Test suite for the functions at recs.js
 */
require('dotenv').load();
const mysql = require('promise-mysql');
const recsDB = require('./recs');
const recsData = require('./recs.testdata');
const testUtils = require('./utils/testutils');

const MYSQLDB = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  multipleStatements: true,
};


beforeAll(() => {
  return mysql.createConnection(MYSQLDB)
  .then((conn) => {
    const result = conn.query(
      testUtils.createInsertUsersQuery(recsData.users) +
      testUtils.createInsertUsersInfoQuery(recsData.users) +
      testUtils.createInsertPhotosQuery(recsData.users) +
      testUtils.createInsertLikesQuery(recsData.likes)
    );
    conn.end();
    return result;
  });
});


afterAll(() => {
  return mysql.createConnection(MYSQLDB)
  .then((conn) => {
    const result = conn.query(
      `SET FOREIGN_KEY_CHECKS=0;` +
      testUtils.deleteUsersQuery +
      testUtils.deleteUsersInfoQuery +
      testUtils.deletePhotosQuery +
      testUtils.deleteLikesQuery +
      `SET FOREIGN_KEY_CHECKS=1;`);
    conn.end();
    return result;
  });
});


describe(`getRecs tests`, () => {
  it(`excludes people the user already liked`, () => {
    const currUserID = 1;
    return recsDB.getRecs(currUserID).then((recs) => {
      const expectedRecs = [
        recsData.getUserByID(4), 
        recsData.getUserByID(5), 
        recsData.getUserByID(6)
      ];
      expect(recs).toHaveLength(expectedRecs.length);
      recs.forEach((rec, i) => {
        expect(rec.userID).toBe(expectedRecs[i].userID);
        expect(rec.userName).toBe(expectedRecs[i].userName);
        expect(rec.genderID).toBe(expectedRecs[i].genderID);
        expect(rec.userBio).toBe(expectedRecs[i].userBio);
        expect(rec.age).toBe(expectedRecs[i].userAge);
        expect(rec.primaryPic).toBe(expectedRecs[i].primaryPic);
      });
    });
  });

  it(`still returns people the user already passed on`, () => {
    const currUserID = 6;
    return recsDB.getRecs(currUserID).then((recs) => {
      const expectedRecs = [
        recsData.getUserByID(1),
        recsData.getUserByID(2),
        recsData.getUserByID(3),
        recsData.getUserByID(4),
        recsData.getUserByID(5),
      ];
      expect(recs).toHaveLength(expectedRecs.length);
      recs.forEach((rec, i) => {
        expect(rec.userID).toBe(expectedRecs[i].userID);
        expect(rec.userName).toBe(expectedRecs[i].userName);
        expect(rec.genderID).toBe(expectedRecs[i].genderID);
        expect(rec.userBio).toBe(expectedRecs[i].userBio);
        expect(rec.age).toBe(expectedRecs[i].userAge);
        expect(rec.primaryPic).toBe(expectedRecs[i].primaryPic);
      });
    });
  });

  it(`returns an empty list if the user liked everyone and there's no one else around`, () => {
    const currUserID = 2;
    return recsDB.getRecs(currUserID).then((recs) => {
      expect(recs).toHaveLength(0);
    });
  });
});



