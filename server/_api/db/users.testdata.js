/**
 * Test data for the tests at users.test.js
 */
const testUtils = require('./utils/testutils');
const refData = require('../../db/referenceData');

// data must be kept ordered by userID starting from 1
const users = [
  { 
    userID: 1, 
    userName: 'User1', 
    userAge: 27, 
    birthday: testUtils.calcBirthday(27), 
    userBio: 'Bio1', 
    primaryPic: 'path/to/pic1',
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
    userName: 'User2', 
    userAge: 22, 
    birthday: testUtils.calcBirthday(22), 
    userBio: 'Bio2', 
    primaryPic: 'path/to/pic2',
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
    userName: 'User3', 
    userAge: 36, 
    birthday: testUtils.calcBirthday(36), 
    userBio: 'Bio3', 
    primaryPic: 'path/to/pic3',
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