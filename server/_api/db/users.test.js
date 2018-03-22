/**
 * Test suite for the functions at users.js
 */

require('dotenv').load();
const mysql = require('promise-mysql');
const usersDB = require('./users');
const usersData = require('./users.testdata');
const testUtils = require('./utils/testutils');
const refData = require('../../db/referenceData');

const MYSQLDB = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  multipleStatements: true,
};

beforeAll(() => {
  return mysql.createConnection(MYSQLDB)
  .then(conn => {
    return conn.query(
      testUtils.createInsertUsersQuery(usersData.users) +
      testUtils.createInsertUsersInfoQuery(usersData.users) +
      testUtils.createInsertPhotosQuery(usersData.users) +
      testUtils.createInsertUserEducationQuery(usersData.users) +
      testUtils.createInsertUserInterestsQuery(usersData.users)
    )
    .then(() => conn.end())
    .catch(err => {
      conn.end();
      throw err;
    })
  });
});

afterAll(() => {
  return mysql.createConnection(MYSQLDB)
  .then(conn => {
    return conn.query(
      `SET FOREIGN_KEY_CHECKS=0;` +
      testUtils.deleteUsersQuery + 
      testUtils.deleteUsersInfoQuery +
      testUtils.deletePhotosQuery +
      testUtils.deleteUserEducationQuery +
      testUtils.deleteUserInterestsQuery +
      `SET FOREIGN_KEY_CHECKS=1;`
    )
    .then(() => conn.end())
    .catch(err => {
      conn.end();
      throw err;
    })
  });
});


describe(`createUser tests`, () => {
  it(`successfully creates new user in the database`, () => {

  });
});


describe(`getUser tests`, () => {
  it(`returns the correct user with all associated info`, () => {
    return usersDB.getUser(1)
    .then(user => expect(user).toEqual(usersData.getUserByID(1)))
    .then(() => usersDB.getUser(2))
    .then(user => expect(user).toEqual(usersData.getUserByID(2)))
    .then(() => usersDB.getUser(3))
    .then(user => expect(user).toEqual(usersData.getUserByID(3)));
  });

  it(`returns null if the user does not exist`, () => {
    const currUserID = 9999;
    return usersDB.getUser(currUserID)
    .then(user => expect(user).toBeNull());
  });
});


describe(`saveUser tests`, () => {
  it(`successfully saves changes to basic user information`, () => {
    const currUserID = 1;
    const modifiedUser = { ...usersData.getUserByID(currUserID) };
    modifiedUser.userName = `Modified User`;
    modifiedUser.userBio = `Modified Bio`;
    modifiedUser.userAge = 99;
    modifiedUser.birthday = testUtils.calcBirthday(99);
    
    return usersDB.saveUser(modifiedUser)
    .then(() => usersDB.getUser(currUserID))
    .then(user => expect(user).toEqual(modifiedUser));
  });

  it(`successfully saves changes to user gender`, () => {
    const currUserID = 1;
    const modifiedUser = { ...usersData.getUserByID(currUserID) };
    modifiedUser.genderID = 3;
    modifiedUser.genderName = refData.GenderType[modifiedUser.genderID - 1];
    
    return usersDB.saveUser(modifiedUser)
    .then(() => usersDB.getUser(currUserID))
    .then(user => expect(user).toEqual(modifiedUser));
  });

  it(`successfully saves changes to user religion`, () => {
    const currUserID = 1;
    const modifiedUser = { ...usersData.getUserByID(currUserID) };
    modifiedUser.religionID = 4;
    modifiedUser.religionName = refData.ReligionType[modifiedUser.religionID - 1];
    
    return usersDB.saveUser(modifiedUser)
    .then(() => usersDB.getUser(currUserID))
    .then(user => expect(user).toEqual(modifiedUser))
    .then(() => {
      modifiedUser.religionID = null;
      modifiedUser.religionName = null;
    })
    .then(() => usersDB.saveUser(modifiedUser))
    .then(() => usersDB.getUser(currUserID))
    .then(user => expect(user).toEqual(modifiedUser));
  });

  it(`successfully saves changes to user education`, () => {
    const currUserID = 1;
    const modifiedUser = { ...usersData.getUserByID(currUserID) };
    modifiedUser.education = [ { educationID: 1, educationName: refData.EducationType[0] } ];
    
    return usersDB.saveUser(modifiedUser)
    .then(() => usersDB.getUser(currUserID))
    .then(user => expect(user).toEqual(modifiedUser))
    .then(() => modifiedUser.education = [])
    .then(() => usersDB.saveUser(modifiedUser))
    .then(() => usersDB.getUser(currUserID))
    .then(user => expect(user).toEqual(modifiedUser));
  });

  it(`successfully saves changes to user interests`, () => {
    const currUserID = 1;
    const modifiedUser = { ...usersData.getUserByID(currUserID) };
    modifiedUser.interests = [ { interestID: 1, interestName: refData.InterestsType[0] } ];
    
    return usersDB.saveUser(modifiedUser)
    .then(() => usersDB.getUser(currUserID))
    .then(user => expect(user).toEqual(modifiedUser))
    .then(() => modifiedUser.interests = [])
    .then(() => usersDB.saveUser(modifiedUser))
    .then(() => usersDB.getUser(currUserID))
    .then(user => expect(user).toEqual(modifiedUser));
  });

  it(`throws an error if the user don't exist`, () => {
    const currUserID = 9999;
    const nonExistentUser = { ...usersData.getUserByID(1) };
    nonExistentUser.userID = currUserID;
    expect(usersDB.saveUser(nonExistentUser)).rejects.toThrow();
  });
});
