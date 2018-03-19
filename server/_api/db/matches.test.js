/**
 * Test suite for the functions at matches.js
 */
require('dotenv').load();
const mysql = require('promise-mysql');
const matchesDB = require('./matches');
const matchesData = require('./matches.testdata');
const testUtils = require('./utils/testutils');

const MYSQLDB = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  multipleStatements: true,
};

const getYearMonthDay = x => x.toISOString().split('T')[0];

beforeAll(() => {
  return mysql.createConnection(MYSQLDB)
  .then((conn) => {
    const result = conn.query(
      testUtils.createInsertUsersQuery(matchesData.users) +
      testUtils.createInsertUsersInfoQuery(matchesData.users) +
      testUtils.createInsertPhotosQuery(matchesData.users) +
      testUtils.createInsertLikesQuery(matchesData.likes)
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


describe('getUserMatches tests', () => {
  const testMatchList = (currUser, expectedMatches, actualMatches) => {
    expect(expectedMatches).toHaveLength(actualMatches.length);
    actualMatches.forEach((match, i) => {
      expect(match.userID).toBe(expectedMatches[i].userID);
      expect(match.userName).toBe(expectedMatches[i].userName);
      expect(match.userBio).toBe(expectedMatches[i].userBio);
      expect(match.userAge).toBe(expectedMatches[i].userAge);
      expect(match.primaryPic).toBe(expectedMatches[i].primaryPic);
      expect(getYearMonthDay(match.matchDate)).toBe(matchesData.getMatchDate(match.userID, currUser));
    });
  }

  test(`matches are only those the userID liked and liked him/her back`, () => {
    const currUserID = 1;
    return matchesDB.getUserMatches(currUserID).then((matches) => {
      const expectedMatches = [matchesData.getUserByID(2), matchesData.getUserByID(4)];
      testMatchList(currUserID, expectedMatches, matches);
    });
  });

  test(`matching is two-way`, () => {
    const expectedMatches = [matchesData.getUserByID(1)];
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
  const testMatchObject = (expectedMatch, actualMatch, expectedMatchDate) => {
    expect(actualMatch.userID).toBe(expectedMatch.userID);
    expect(actualMatch.userName).toBe(expectedMatch.userName);
    expect(actualMatch.userBio).toBe(expectedMatch.userBio);
    expect(actualMatch.userAge).toBe(expectedMatch.userAge);
    expect(actualMatch.userPics).toBe(expectedMatch.primaryPic);
    expect(getYearMonthDay(actualMatch.matchTime)).toBe(expectedMatchDate);
  };

  test(`correct record is returned if the users are matched`, () => {
    const currUserID = 1;
    const matchUserID = 2;
    const expectedMatch = matchesData.getUserByID(matchUserID);
    const expectedMatchDate = matchesData.getMatchDate(currUserID, matchUserID);

    return matchesDB.getMatch(currUserID, matchUserID).then((matches) => {
      expect(matches).toHaveLength(1);
      testMatchObject(expectedMatch, matches[0], expectedMatchDate);
    })
    .then(() => {
      const currUserID = 2;
      const matchUserID = 1;
      const expectedMatch = matchesData.getUserByID(matchUserID);

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
