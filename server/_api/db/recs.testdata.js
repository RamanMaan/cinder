/**
 * Test data for the tests at recs.test.js
 */
const testUtils = require('./utils/testutils');

// data must be kept ordered by userID starting from 1
const users = [
  { userID: 1, name: 'User1', genderID: 1, bio: 'Bio1', age: 27, birthday: testUtils.calcBirthday(27), img: 'path/to/pic1' },
  { userID: 2, name: 'User2', genderID: 1, bio: 'Bio2', age: 22, birthday: testUtils.calcBirthday(22), img: 'path/to/pic2' },
  { userID: 3, name: 'User3', genderID: 1, bio: 'Bio3', age: 36, birthday: testUtils.calcBirthday(36), img: 'path/to/pic3' },
  { userID: 4, name: 'User4', genderID: 2, bio: 'Bio4', age: 20, birthday: testUtils.calcBirthday(20), img: 'path/to/pic4' },
  { userID: 5, name: 'User5', genderID: 2, bio: 'Bio5', age: 44, birthday: testUtils.calcBirthday(44), img: 'path/to/pic5' },
  { userID: 6, name: 'User6', genderID: 2, bio: 'Bio6', age: 23, birthday: testUtils.calcBirthday(23), img: 'path/to/pic6' },
];

const likes = [
  { user1ID: 1, user2ID: 2, userAction: 'L', actionDate: '1997-05-15' },
  { user1ID: 1, user2ID: 3, userAction: 'L', actionDate: '1996-05-15' },
  { user1ID: 2, user2ID: 1, userAction: 'L', actionDate: '1993-05-15' },
  { user1ID: 2, user2ID: 3, userAction: 'L', actionDate: '1963-05-15' },
  { user1ID: 2, user2ID: 4, userAction: 'L', actionDate: '1992-05-15' },
  { user1ID: 2, user2ID: 5, userAction: 'L', actionDate: '1983-05-15' },
  { user1ID: 2, user2ID: 6, userAction: 'L', actionDate: '1992-05-15' },
  { user1ID: 6, user2ID: 1, userAction: 'P', actionDate: '1995-05-15' },
  { user1ID: 6, user2ID: 2, userAction: 'P', actionDate: '1999-05-15' },
  { user1ID: 6, user2ID: 3, userAction: 'P', actionDate: '2005-05-15' },
  { user1ID: 6, user2ID: 4, userAction: 'P', actionDate: '2002-05-15' },
  { user1ID: 6, user2ID: 5, userAction: 'P', actionDate: '2015-05-15' },
];

const getUserByID = (id) => { 
  if (users[id - 1].userID != id) {
    throw Error('recs.testdata.getUserByID Error'); 
  }
  return users[id - 1]; 
};

module.exports = {
  users,
  likes,
  getUserByID
};
