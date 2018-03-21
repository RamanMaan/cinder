/**
 * Test data for the tests at users.test.js
 */
const testUtils = require('./utils/testutils');

// data must be kept ordered by userID starting from 1
const users = [
  { userID: 1, userName: 'User1', genderID: 1, userBio: 'Bio1', userAge: 27, birthday: testUtils.calcBirthday(27), primaryPic: 'path/to/pic1' },
  { userID: 2, userName: 'User2', genderID: 1, userBio: 'Bio2', userAge: 22, birthday: testUtils.calcBirthday(22), primaryPic: 'path/to/pic2' },
  { userID: 3, userName: 'User3', genderID: 1, userBio: 'Bio3', userAge: 36, birthday: testUtils.calcBirthday(36), primaryPic: 'path/to/pic3' },
  { userID: 4, userName: 'User4', genderID: 2, userBio: 'Bio4', userAge: 20, birthday: testUtils.calcBirthday(20), primaryPic: 'path/to/pic4' },
  { userID: 5, userName: 'User5', genderID: 2, userBio: 'Bio5', userAge: 44, birthday: testUtils.calcBirthday(44), primaryPic: 'path/to/pic5' },
  { userID: 6, userName: 'User6', genderID: 2, userBio: 'Bio6', userAge: 23, birthday: testUtils.calcBirthday(23), primaryPic: 'path/to/pic6' },
];

const getUserByID = (id) => { 
  if (users[id - 1].userID != id) {
    throw Error('users.testdata.getUserByID Error'); 
  }
  return users[id - 1]; 
};

module.exports = {
  users,
  getUserByID,
};  