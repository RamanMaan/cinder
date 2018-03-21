/**
 * Test data for the tests at filters.test.js
 */
const testUtils = require('./utils/testutils');
const refData = require('../../db/referenceData');

// keep the filters arranged by userID starting from 1
const users = [
  { userID: 1, userName: 'User1', genderID: 1, userBio: 'Bio1', userAge: 27, birthday: testUtils.calcBirthday(27), primaryPic: 'path/to/pic1' },
  { userID: 2, userName: 'User2', genderID: 1, userBio: 'Bio2', userAge: 22, birthday: testUtils.calcBirthday(22), primaryPic: 'path/to/pic2' },
  { userID: 3, userName: 'User3', genderID: 1, userBio: 'Bio3', userAge: 36, birthday: testUtils.calcBirthday(36), primaryPic: 'path/to/pic3' },
];

const filterStates = [
  { userID: 1, ageFilterState: true, genderFilterState: false, educationFilterState: true },
  { userID: 2, ageFilterState: false, genderFilterState: true, educationFilterState: true },
];

const ageFilters = [
  { userID: 1, minAge: 18, maxAge: 38 },
  { userID: 2, minAge: 222, maxAge: 333 },
];

const genderFilters = [
  { userID: 1, preference: [{ genderID: 1, genderName: refData.GenderType[0] }, { genderID: 2, genderName: refData.GenderType[1] }] },
  { userID: 2, preference: [{ genderID: 2, genderName: refData.GenderType[1] }] },
];

const educationFilters = [
  { 
    userID: 1, 
    preference: [
      { educationID: 3, educationName: refData.EducationType[2] }, 
      { educationID: 4, educationName: refData.EducationType[3] }, 
      { educationID: 5, educationName: refData.EducationType[4] },
    ] 
  },{ 
    userID: 2, 
    preference: [
      { educationID: 4, educationName: refData.EducationType[3] }, 
      { educationID: 5, educationName: refData.EducationType[4] },
    ]
  }
];

const getAgeFilterState = (id) => {
  if (filterStates[id - 1].userID != id) {
    throw Error('filters.testdata.getAgeFilterState Error'); 
  }
  return filterStates[id - 1].ageFilterState; 
}

const getGenderFilterState = (id) => {
  if (filterStates[id - 1].userID != id) {
    throw Error('filters.testdata.getGenderFilterState Error'); 
  }
  return filterStates[id - 1].genderFilterState; 
}

const getEducationFilterState = (id) => {
  if (filterStates[id - 1].userID != id) {
    throw Error('filters.testdata.getEducationFilterState Error'); 
  }
  return filterStates[id - 1].educationFilterState; 
}

const getAgeFilter = (id) => {
  if (ageFilters[id - 1].userID != id) {
    throw Error('filters.testdata.getAgeFilter Error'); 
  }
  return ageFilters[id - 1]; 
}

const getGenderFilter = (id) => {
  if (genderFilters[id - 1].userID != id) {
    throw Error('filters.testdata.getGenderFilter Error'); 
  }
  return genderFilters[id - 1]; 
}

const getEducationFilter = (id) => {
  if (educationFilters[id - 1].userID != id) {
    throw Error('filters.testdata.getEducationFilter Error'); 
  }
  return educationFilters[id - 1]; 
}

module.exports = {
  users,
  filterStates,
  ageFilters,
  genderFilters,
  educationFilters,
  getAgeFilter,
  getAgeFilterState,
  getGenderFilter,
  getGenderFilterState,
  getEducationFilter,
  getEducationFilterState,
};
