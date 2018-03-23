/**
 * Test data for the tests at users.test.js
 */
const testUtils = require('./utils/testutils');
const refData = require('../../db/referenceData');

// data must be kept ordered by userID starting from 1
const users = [
  { 
    userID: 1, 
    name: 'User1', 
    age: 27, 
    birthday: testUtils.calcBirthday(27), 
    bio: 'Bio1', 
    img: 'path/to/pic1',
    genderID: 1,
    genderName: refData.GenderType[0],
    religionID: 2,
    religionName: refData.ReligionType[1],
    education: [ 
      { educationID: 1, educationName: refData.EducationType[0] }, 
      { educationID: 3, educationName: refData.EducationType[2] },
      { educationID: 4, educationName: refData.EducationType[3] },
      { educationID: 5, educationName: refData.EducationType[4] },
    ],
    interests: [ 
      { interestID: 1, interestName: refData.InterestsType[0] }, 
      { interestID: 3, interestName: refData.InterestsType[2] },
      { interestID: 4, interestName: refData.InterestsType[3] },
    ]
  },{ 
    userID: 2, 
    name: 'User2', 
    age: 22, 
    birthday: testUtils.calcBirthday(22), 
    bio: 'Bio2', 
    img: 'path/to/pic2',
    genderID: 2,
    genderName: refData.GenderType[1],
    religionID: 3,
    religionName: refData.ReligionType[2],
    education: [ 
      { educationID: 1, educationName: refData.EducationType[0] }, 
      { educationID: 3, educationName: refData.EducationType[2] },
      { educationID: 4, educationName: refData.EducationType[3] },
    ],
    interests: [ 
      { interestID: 1, interestName: refData.InterestsType[0] }, 
      { interestID: 2, interestName: refData.InterestsType[1] },
    ]
  },{ 
    userID: 3, 
    name: 'User3', 
    age: 36, 
    birthday: testUtils.calcBirthday(36), 
    bio: 'Bio3', 
    img: 'path/to/pic3',
    genderID: 2,
    genderName: refData.GenderType[1],
    religionID: 2,
    religionName: refData.ReligionType[1],
    education: [],
    interests: [] 
  },
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