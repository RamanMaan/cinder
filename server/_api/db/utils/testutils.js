const mysql = require('promise-mysql');

const createInsertUsersQuery = (users) => {
  return `INSERT INTO Users (UserID, UserEmail, UserPassword) VALUES ` + 
  users.map(x => mysql.format(` (?, 'SomeEmail', 'SomePassword') `, [x.userID])).join(', ') + `;`;
}

const createInsertUsersInfoQuery = (users) => {
  return `INSERT INTO UsersInfo (UserID, UserName, Birthday, GenderID, Bio) VALUES ` + 
  users.map(x => mysql.format(` (?, ?, ? ,? ,?) `, [x.userID, x.userName, x.birthday, x.genderID, x.userBio])).join(`, `) + `;`;
}

const createInsertPhotosQuery = (users) => {
  return `INSERT INTO UserPicture (UserID, PicturePath, PrimaryPicture) VALUES ` + 
  users.map(x => mysql.format(` (?, ?, ?) `, [x.userID, x.primaryPic, 1])).join(`, `) + `;`;
}

const createInsertLikesQuery = (likes) => {
  return `INSERT INTO Likes (User1ID, User2ID, UserAction, ActionDate) VALUES ` + 
  likes.map(x => mysql.format(` (?, ?, ?, ?) `, [x.user1ID, x.user2ID, x.userAction, x.actionDate])).join(`, `) + `;`;
}

const createInsertFilterStateQuery = (filterStates) => {
  return `INSERT INTO FilterState (UserID, AgeFilterState, GenderFilterState) VALUES ` +
  filterStates.map(x => mysql.format(` (?, ?, ?) `, [x.userID, x.ageFilterState, x.genderFilterState])).join(`, `) + `;`;
};

const createInsertAgeFilterQuery = (ageFilters) => {
  return `INSERT INTO AgeFilter (UserID, MinAge, MaxAge) VALUES ` + 
  ageFilters.map(x => mysql.format(` (?, ?, ?) `, [x.userID, x.minAge, x.maxAge])).join(`, `) + `;`;
};

const createInsertGenderFilterQuery = (genderFilters) => {
  const rows = [];
  genderFilters.forEach(x => {
    x.preference.forEach(g => {
      rows.push(Object.assign({}, { userID: x.userID }, g));
    });
  });
  return `INSERT INTO GenderFilter (UserID, GenderID) VALUES ` +
  rows.map(x => mysql.format(` (?, ?) `, [x.userID, x.genderID])).join(`, `) + `;`;
};

const deleteUsersQuery = `TRUNCATE TABLE Users;`;
const deleteUsersInfoQuery = `TRUNCATE TABLE UsersInfo;`;
const deletePhotosQuery = `TRUNCATE TABLE UserPicture;`;
const deleteLikesQuery = `TRUNCATE TABLE Likes;`;
const deleteFilterStateQuery = `TRUNCATE TABLE FilterState;`;
const deleteAgeFilterQuery = `TRUNCATE TABLE AgeFilter;`;
const deleteGenderFilterQuery = `TRUNCATE TABLE GenderFilter;`;

const calcBirthday = x => {
  var currDate = new Date();
  currDate = new Date(currDate.setFullYear(currDate.getFullYear() - x));
  currDate = new Date(currDate.setDate(currDate.getDate() - 1));
  return currDate.toISOString().split('T')[0];
};

module.exports = {
  createInsertUsersQuery,
  createInsertUsersInfoQuery,
  createInsertPhotosQuery,
  createInsertLikesQuery,
  createInsertFilterStateQuery,
  createInsertAgeFilterQuery,
  createInsertGenderFilterQuery,
  deleteUsersQuery,
  deleteUsersInfoQuery,
  deletePhotosQuery,
  deleteLikesQuery,
  calcBirthday,
  deleteFilterStateQuery,
  deleteAgeFilterQuery,
  deleteGenderFilterQuery,
};
