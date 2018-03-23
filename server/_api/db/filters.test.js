/**
 * Test suite for the functions at filters.js
 */
require('dotenv').load();
const mysql = require('promise-mysql');
const filterDB = require('./filters');
const filterData = require('./filters.testdata');
const testUtils = require('./utils/testutils');

const MYSQLDB = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  multipleStatements: true
};

beforeAll(() => {
  return mysql.createConnection(MYSQLDB).then(conn => {
    const result = conn.query(
      testUtils.createInsertUsersQuery(filterData.users) +
        testUtils.createInsertUsersInfoQuery(filterData.users)
    );
    conn.end();
    return result;
  });
});

afterAll(() => {
  return mysql.createConnection(MYSQLDB).then(conn => {
    const result = conn.query(
      `SET FOREIGN_KEY_CHECKS=0;` +
        testUtils.deleteUsersQuery +
        testUtils.deleteUsersInfoQuery +
        `SET FOREIGN_KEY_CHECKS=1;`
    );
    conn.end();
    return result;
  });
});

const insertFilterData = () => {
  return mysql.createConnection(MYSQLDB).then(conn => {
    const result = conn.query(
      testUtils.createInsertFilterStateQuery(filterData.filterStates) +
        testUtils.createInsertAgeFilterQuery(filterData.ageFilters) +
        testUtils.createInsertGenderFilterQuery(filterData.genderFilters)
    );
    conn.end();
    return result;
  });
};

const deleteFilterData = () => {
  return mysql.createConnection(MYSQLDB).then(conn => {
    const result = conn.query(
      `SET FOREIGN_KEY_CHECKS=0;` +
        testUtils.deleteFilterStateQuery +
        testUtils.deleteAgeFilterQuery +
        testUtils.deleteGenderFilterQuery +
        `SET FOREIGN_KEY_CHECKS=1;`
    );
    conn.end();
    return result;
  });
};

describe(`getAgeFilter tests`, () => {
  beforeAll(() => insertFilterData());
  afterAll(() => deleteFilterData());

  it(`returns the correct age filter for the user`, () => {
    const currUserID = 1;
    return filterDB.getAgeFilter(currUserID).then(filter => {
      expect(filter.state).toBe(filterData.getAgeFilterState(currUserID));
      expect(filter.minAge).toBe(filterData.getAgeFilter(currUserID).minAge);
      expect(filter.maxAge).toBe(filterData.getAgeFilter(currUserID).maxAge);
    });
  });

  it(`returns null if the user does not exist`, () => {
    const currUserID = 9999;
    return filterDB.getAgeFilter(currUserID).then(filter => {
      expect(filter).toBeNull();
    });
  });

  it(`returns null if the user does not have an age filter`, () => {
    const currUserID = 3;
    return filterDB.getAgeFilter(currUserID).then(filter => {
      expect(filter).toBeNull();
    });
  });
});

describe(`saveAgeFilter tests`, () => {
  beforeAll(() => insertFilterData());
  afterAll(() => deleteFilterData());

  it(`saves new age filters`, () => {
    const currUserID = 3;
    const newFilter = { state: true, minAge: 18, maxAge: 125 };
    const stateQuery = `SELECT AgeFilterState AS ageFilterState FROM FilterState WHERE UserID = ?`;
    const filterQuery = `SELECT MinAge AS minAge, MaxAge AS maxAge FROM AgeFilter WHERE UserID = ?`;

    return mysql.createConnection(MYSQLDB).then(conn => {
      return conn
        .query(filterQuery, [currUserID])
        .then(rows => expect(rows).toHaveLength(0))
        .then(() => filterDB.saveAgeFilter(currUserID, newFilter))
        .then(() => conn.query(stateQuery, [currUserID]))
        .then(rows => {
          expect(rows).toHaveLength(1);
          expect(rows[0].ageFilterState == 1).toBe(newFilter.state);
        })
        .then(() => conn.query(filterQuery, [currUserID]))
        .then(rows => {
          expect(rows).toHaveLength(1);
          expect(rows[0].minAge).toBe(newFilter.minAge);
          expect(rows[0].maxAge).toBe(newFilter.maxAge);
          return conn.end();
        });
    });
  });

  it(`overwrites existing age filters`, () => {
    const currUserID = 1;
    const newFilter = { state: false, minAge: 666, maxAge: 777 };
    const stateQuery = `SELECT AgeFilterState AS ageFilterState FROM FilterState WHERE UserID = ?`;
    const filterQuery = `SELECT MinAge AS minAge, MaxAge AS maxAge FROM AgeFilter WHERE UserID = ?`;

    return mysql.createConnection(MYSQLDB).then(conn => {
      return conn
        .query(stateQuery, [currUserID])
        .then(rows => expect(rows).toHaveLength(1))
        .then(() => conn.query(filterQuery, [currUserID]))
        .then(rows => expect(rows).toHaveLength(1))
        .then(() => filterDB.saveAgeFilter(currUserID, newFilter))
        .then(() => conn.query(stateQuery, [currUserID]))
        .then(rows => {
          expect(rows).toHaveLength(1);
          expect(rows[0].ageFilterState == 1).toBe(newFilter.state);
        })
        .then(() => conn.query(filterQuery, [currUserID]))
        .then(rows => {
          expect(rows).toHaveLength(1);
          expect(rows[0].minAge).toBe(newFilter.minAge);
          expect(rows[0].maxAge).toBe(newFilter.maxAge);
          return conn.end();
        });
    });
  });

  it(`it throws an error for users that don't exist`, () => {
    const currUserID = 9999;
    const someFilter = { state: true, minAge: 18, maxAge: 55 };
    expect(filterDB.saveAgeFilter(currUserID, someFilter)).rejects.toThrow();
  });
});

describe(`getGenderFilter tests`, () => {
  beforeAll(() => insertFilterData());
  afterAll(() => deleteFilterData());

  it(`returns the correct gender filter for the user`, () => {
    const currUserID = 1;
    const expectedState = filterData.getGenderFilterState(currUserID);
    const expectedFilter = filterData.getGenderFilter(currUserID);

    return filterDB.getGenderFilter(currUserID).then(filter => {
      expect(filter).toBeTruthy();
      expect(filter.state).toBe(expectedState);
      expect(filter.preference).toHaveLength(expectedFilter.preference.length);

      filter.preference.forEach((pref, i) => {
        expect(pref.genderID).toBe(expectedFilter.preference[i].genderID);
        expect(pref.genderName).toBe(expectedFilter.preference[i].genderName);
      });
    });
  });

  it(`returns null if the user does not exist`, () => {
    const currUserID = 9999;
    return filterDB.getGenderFilter(currUserID).then(filter => {
      expect(filter).toBeNull();
    });
  });

  it(`returns null if the user does not have a gender filter`, () => {
    const currUserID = 3;
    return filterDB.getGenderFilter(currUserID).then(filter => {
      expect(filter).toBeNull();
    });
  });
});

describe(`saveGenderFilter tests`, () => {
  beforeEach(() => insertFilterData());
  afterEach(() => deleteFilterData());

  it(`saves new gender filter`, () => {
    const currUserID = 3;
    const newFilter = {
      state: false,
      preference: [{ genderID: 1 }, { genderID: 2 }]
    };
    const stateQuery = `SELECT GenderFilterState AS genderFilterState FROM FilterState WHERE UserID = ?`;
    const filterQuery = `SELECT GenderID AS genderID FROM GenderFilter WHERE UserID = ?`;

    return mysql.createConnection(MYSQLDB).then(conn => {
      return conn
        .query(filterQuery, [currUserID])
        .then(rows => expect(rows).toHaveLength(0))
        .then(() => filterDB.saveGenderFilter(currUserID, newFilter))
        .then(() => conn.query(stateQuery, [currUserID]))
        .then(rows => {
          expect(rows).toHaveLength(1);
          expect(rows[0].genderFilterState == 1).toBe(newFilter.state);
        })
        .then(() => conn.query(filterQuery, [currUserID]))
        .then(rows => {
          expect(rows).toHaveLength(newFilter.preference.length);
          rows.forEach((pref, i) => {
            expect(pref.genderID).toBe(newFilter.preference[i].genderID);
          });
          return conn.end();
        });
    });
  });

  it(`overwrites existing gender filter`, () => {
    const currUserID = 1;
    const newFilter = { state: false, preference: [{ genderID: 3 }] };
    const stateQuery = `SELECT GenderFilterState AS genderFilterState FROM FilterState WHERE UserID = ?`;
    const filterQuery = `SELECT GenderID AS genderID FROM GenderFilter WHERE UserID = ?`;

    return mysql.createConnection(MYSQLDB).then(conn => {
      return conn
        .query(stateQuery, [currUserID])
        .then(rows => expect(rows).not.toHaveLength(0))
        .then(() => conn.query(filterQuery, [currUserID]))
        .then(rows => expect(rows).not.toHaveLength(0))
        .then(() => filterDB.saveGenderFilter(currUserID, newFilter))
        .then(() => conn.query(stateQuery, [currUserID]))
        .then(rows => {
          expect(rows).toHaveLength(1);
          expect(rows[0].genderFilterState == 1).toBe(newFilter.state);
        })
        .then(() => conn.query(filterQuery, [currUserID]))
        .then(rows => {
          expect(rows).toHaveLength(newFilter.preference.length);
          rows.forEach((pref, i) => {
            expect(pref.genderID).toBe(newFilter.preference[i].genderID);
          });
          return conn.end();
        });
    });
  });

  it(`saves an empty gender filter`, () => {
    const currUserID = 1;
    const emptyFilter = { state: true, preference: [] };
    const genderFilterQuery = mysql.format(
      `SELECT * FROM GenderFilter WHERE UserID = ?;`,
      [currUserID]
    );

    return mysql.createConnection(MYSQLDB).then(conn => {
      return conn
        .query(genderFilterQuery)
        .then(rows => expect(rows).not.toHaveLength(0))
        .then(() => filterDB.saveGenderFilter(currUserID, emptyFilter))
        .then(() => conn.query(genderFilterQuery))
        .then(rows => expect(rows).toHaveLength(0))
        .then(() => conn.end());
    });
  });

  it(`it throws an error for users that don't exist`, () => {
    const currUserID = 9999;
    const someFilter = { state: true, preference: [{ genderID: 1 }] };
    expect(filterDB.saveGenderFilter(currUserID, someFilter)).rejects.toThrow();
  });
});
