/**
 * Test suite for the functions at matches.js
 */
require('dotenv').load();
const mysql = require('promise-mysql');
const matchesDB = require('./matches');

const MYSQLDB = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  multipleStatements: true,
};

const getYearMonthDay = x => x.toISOString().split('T')[0];

const getBirthday = x => {
  var currDate = new Date();
  currDate = new Date(currDate.setFullYear(currDate.getFullYear() - x));
  currDate = new Date(currDate.setDate(currDate.getDate() - 1));
  return getYearMonthDay(currDate);
};

const usersTestData = [
  { userID: 1, userName: 'User1', genderID: 1, userBio: 'Bio1', userAge: 27, birthday: getBirthday(27), primaryPic: 'path/to/pic1' },
  { userID: 2, userName: 'User2', genderID: 1, userBio: 'Bio2', userAge: 22, birthday: getBirthday(22), primaryPic: 'path/to/pic2' },
  { userID: 3, userName: 'User3', genderID: 1, userBio: 'Bio3', userAge: 36, birthday: getBirthday(36), primaryPic: 'path/to/pic3' },
  { userID: 4, userName: 'User4', genderID: 2, userBio: 'Bio4', userAge: 20, birthday: getBirthday(20), primaryPic: 'path/to/pic4' },
  { userID: 5, userName: 'User5', genderID: 2, userBio: 'Bio5', userAge: 44, birthday: getBirthday(44), primaryPic: 'path/to/pic5' },
  { userID: 6, userName: 'User6', genderID: 2, userBio: 'Bio6', userAge: 23, birthday: getBirthday(23), primaryPic: 'path/to/pic6' },
];

const likesTestData = [
  { user1ID: 1, user2ID: 2, userAction: 'L', actionDate: '1997-05-15' },
  { user1ID: 1, user2ID: 3, userAction: 'L', actionDate: '1996-05-15' },
  { user1ID: 1, user2ID: 4, userAction: 'L', actionDate: '1995-05-15' },
  { user1ID: 1, user2ID: 5, userAction: 'L', actionDate: '1994-05-15' },
  { user1ID: 2, user2ID: 1, userAction: 'L', actionDate: '1993-05-15' },
  { user1ID: 3, user2ID: 1, userAction: 'P', actionDate: '1992-05-15' },
  { user1ID: 4, user2ID: 1, userAction: 'L', actionDate: '1991-05-15' },
  { user1ID: 5, user2ID: 1, userAction: 'P', actionDate: '1990-05-15' },
];

const insertUsers = `INSERT INTO Users (UserID, UserEmail, UserPassword) VALUES ` + 
usersTestData.map(x => mysql.format(` (?, 'SomeEmail', 'SomePassword') `, [x.userID])).join(', ') + `;`;

const insertUsersInfo = `INSERT INTO UsersInfo (UserID, UserName, Birthday, GenderID, Bio) VALUES ` + 
usersTestData.map(x => mysql.format(` (?, ?, ? ,? ,?) `, [x.userID, x.userName, x.birthday, x.genderID, x.userBio])).join(`, `) + `;`;

const insertPhotos = `INSERT INTO UserPicture (UserID, PicturePath, PrimaryPicture) VALUES ` + 
usersTestData.map(x => mysql.format(` (?, ?, ?) `, [x.userID, x.primaryPic, 1])).join(`, `) + `;`;

const insertLikes = `INSERT INTO Likes (User1ID, User2ID, UserAction, ActionDate) VALUES ` + 
likesTestData.map(x => mysql.format(` (?, ?, ?, ?) `, [x.user1ID, x.user2ID, x.userAction, x.actionDate])).join(`, `) + `;`;

const deleteUsers = `TRUNCATE TABLE Users;`;
const deleteUsersInfo = `TRUNCATE TABLE UsersInfo;`;
const deletePhotos = `TRUNCATE TABLE UserPicture;`;
const deleteLikes = `TRUNCATE TABLE Likes;`;

const testMatchList = (currUser, expectedMatches, actualMatches) => {
  expect(expectedMatches).toHaveLength(actualMatches.length);
  actualMatches.forEach((match, i) => {
    expect(match.userID).toBe(expectedMatches[i].userID);
    expect(match.userName).toBe(expectedMatches[i].userName);
    expect(match.userBio).toBe(expectedMatches[i].userBio);
    expect(match.userAge).toBe(expectedMatches[i].userAge);
    expect(match.primaryPic).toBe(expectedMatches[i].primaryPic);

    const matchDate1 = new Date(likesTestData.find(x => x.user1ID == match.userID && x.user2ID == currUser).actionDate);
    const matchDate2 = new Date(likesTestData.find(x => x.user2ID == match.userID && x.user1ID == currUser).actionDate);
    expect(getYearMonthDay(match.matchDate)).toBe(getYearMonthDay(new Date(Math.max(matchDate1, matchDate2))));
  });
}

const testMatchObject = (expectedMatch, actualMatch, expectedMatchDate) => {
  expect(actualMatch.userID).toBe(expectedMatch.userID);
  expect(actualMatch.userName).toBe(expectedMatch.userName);
  expect(actualMatch.userBio).toBe(expectedMatch.userBio);
  expect(actualMatch.userAge).toBe(expectedMatch.userAge);
  expect(actualMatch.userPics).toBe(expectedMatch.primaryPic);
  expect(getYearMonthDay(actualMatch.matchTime)).toBe(expectedMatchDate);
};


beforeAll(() => {
  return mysql.createConnection(MYSQLDB)
  .then((conn) => {
    const result = conn.query(insertUsers + insertUsersInfo + insertLikes + insertPhotos);
    conn.end();
    return result;
  });
});


afterAll(() => {
  return mysql.createConnection(MYSQLDB)
  .then((conn) => {
    const result = conn.query(
      `SET FOREIGN_KEY_CHECKS=0;` +
      deleteUsers +
      deleteUsersInfo +
      deletePhotos +
      deleteLikes +
      `SET FOREIGN_KEY_CHECKS=1;`);
    conn.end();
    return result;
  });
});


describe('getUserMatches tests', () => {
  test(`matches are only those the userID liked and liked him/her back`, () => {
    const currUserID = 1;
    return matchesDB.getUserMatches(currUserID).then((matches) => {
      const expectedMatches = [usersTestData[1], usersTestData[3]];
      testMatchList(currUserID, expectedMatches, matches);
    });
  });

  test(`matching is two-way`, () => {
    const expectedMatches = [usersTestData[0]];
    const currUserID = 2;
    return matchesDB.getUserMatches(currUserID).then((matches) => {
      testMatchList(currUserID, expectedMatches, matches);
    })
    .then(() => {
      const currUserID = 4;
      return matchesDB.getUserMatches(currUserID).then((matches) => {
        testMatchList(currUserID, expectedMatches, matches);
      });
    });
  });
  
  test(`no record is returned for users without any match`, () => {
    return matchesDB.getUserMatches(6).then((matches) => {
      expect(matches).toHaveLength(0);
    });
  });

  test(`no record is returned for users that don't exist`, () => {
    return matchesDB.getUserMatches(9999).then((matches) => {
      expect(matches).toHaveLength(0);
    });
  });
});


describe('getMatch tests', () => {
  test(`correct record is returned if the users are matched`, () => {
    const currUserID = 1;
    const matchUserID = 2;
    const expectedMatch = usersTestData[matchUserID - 1];
    const matchDate1 = new Date(likesTestData.find(x => x.user1ID == currUserID && x.user2ID == matchUserID).actionDate);
    const matchDate2 = new Date(likesTestData.find(x => x.user2ID == currUserID && x.user1ID == matchUserID).actionDate);
    const expectedMatchDate = getYearMonthDay(new Date(Math.max(matchDate1, matchDate2)));

    return matchesDB.getMatch(currUserID, matchUserID).then((matches) => {
      expect(matches).toHaveLength(1);
      testMatchObject(expectedMatch, matches[0], expectedMatchDate);
    })
    .then(() => {
      const currUserID = 2;
      const matchUserID = 1;
      const expectedMatch = usersTestData[matchUserID - 1];

      return matchesDB.getMatch(currUserID, matchUserID).then((matches) => {
        expect(matches).toHaveLength(1);
        testMatchObject(expectedMatch, matches[0], expectedMatchDate);
      });
    });
  });

  test(`no record is returned if users are not matched`, () => {
    return matchesDB.getMatch(1, 6).then((matches) => {
      expect(matches).toHaveLength(0);
    });
  });

  test(`no record is returned if current user does not exist`, () => {
    return matchesDB.getMatch(9999, 2).then((matches) => {
      expect(matches).toHaveLength(0);
    });
  });

  test(`no record is returned if matched user does not exist`, () => {
    return matchesDB.getMatch(1, 9999).then((matches) => {
      expect(matches).toHaveLength(0);
    });
  });
});


describe('addUserSwipe tests', () => {
  test(`new action is inserted`, () => {
    const user1ID = 2;
    const user2ID = 3;
    const actionQuery = mysql.format(`
    SELECT UserAction as userAction 
    FROM Likes WHERE User1ID = ? AND User2ID = ?;
    `, [user1ID, user2ID]);

    return mysql.createConnection(MYSQLDB)
    .then((conn) => {
      const result = conn.query(actionQuery);
      conn.end();
      return result;
    })
    .then((result) => {
      expect(result).toHaveLength(0);
    })
    .then(() => {
      return matchesDB.addUserSwipe(user1ID, user2ID, 'L')
      .then(() => {
        return mysql.createConnection(MYSQLDB)
        .then((conn) => {
          const result = conn.query(actionQuery);
          conn.end();
          return result;
        })
        .then((result) => {
          expect(result).toHaveLength(1);
          expect(result[0].userAction).toBe('L');
        });
      });
    });
  });

  test(`action record is overwritten if it already exists`, () => {
    const user1ID = 1;
    const user2ID = 5;
    const actionQuery = mysql.format(`
    SELECT UserAction as userAction 
    FROM Likes WHERE User1ID = ? AND User2ID = ?;
    `, [user1ID, user2ID]);

    return mysql.createConnection(MYSQLDB)
    .then((conn) => {
      const result = conn.query(actionQuery);
      conn.end();
      return result;
    })
    .then((result) => {
      expect(result).toHaveLength(1);
      expect(result[0].userAction).toBe('L');
    })
    .then(() => {
      return matchesDB.addUserSwipe(user1ID, user2ID, 'P')
      .then(() => {
        return mysql.createConnection(MYSQLDB)
        .then((conn) => {
          const result = conn.query(actionQuery);
          conn.end();
          return result;
        })
        .then((result) => {
          expect(result).toHaveLength(1);
          expect(result[0].userAction).toBe('P');
        });
      });
    });
  });

  test(`error is thrown if current user does not exist`, () => {
    expect(matchesDB.addUserSwipe(9999, 1, 'L')).rejects.toThrow();
  });

  test(`error is thrown if the other user does not exist`, () => {
    expect(matchesDB.addUserSwipe(1, 9999, 'L')).rejects.toThrow();
  });
});


describe('haveUsersMatched tests', () => {
  test(`returns true if the users are matched`, () => {
    return matchesDB.haveUsersMatched(1, 2).then((result) => {
      expect(result).toHaveLength(1);
      expect(result[0].matched).toBe('true');
    });
  });

  test(`returns false if the users are not matched`, () => {
    return matchesDB.haveUsersMatched(1, 6).then((result) => {
      expect(result).toHaveLength(1);
      expect(result[0].matched).toBe('false');
    });
  });

  test(`returns false if current user does not exist`, () => {
    return matchesDB.haveUsersMatched(9999, 1).then((result) => {
      expect(result).toHaveLength(1);
      expect(result[0].matched).toBe('false');
    });
  });

  test(`returns false if the other user does not exist`, () => {
    return matchesDB.haveUsersMatched(1, 9999).then((result) => {
      expect(result).toHaveLength(1);
      expect(result[0].matched).toBe('false');
    });
  });
});
