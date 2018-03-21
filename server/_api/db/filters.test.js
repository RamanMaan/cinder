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
  multipleStatements: true,
};


beforeAll(() => {
  return mysql.createConnection(MYSQLDB)
  .then((conn) => {
    const result = conn.query(
      testUtils.createInsertUsersQuery(filterData.users) + 
      testUtils.createInsertUsersInfoQuery(filterData.users)
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
      `SET FOREIGN_KEY_CHECKS=1;`
    );
    conn.end();
    return result;
  });
});


const insertFilterData = () => {
  return mysql.createConnection(MYSQLDB)
  .then((conn) => {
    const result = conn.query(
      testUtils.createInsertFilterStateQuery(filterData.filterStates) +
      testUtils.createInsertAgeFilterQuery(filterData.ageFilters) +
      testUtils.createInsertGenderFilterQuery(filterData.genderFilters) +
      testUtils.createInsertEducationFilterQuery(filterData.educationFilters)
    );
    conn.end();
    return result;
  });
};


const deleteFilterData = () => {
  return mysql.createConnection(MYSQLDB)
  .then((conn) => {
    const result = conn.query(
      `SET FOREIGN_KEY_CHECKS=0;` +
      testUtils.deleteFilterStateQuery +
      testUtils.deleteAgeFilterQuery +
      testUtils.deleteGenderFilterQuery +
      testUtils.deleteEducationFilterQuery +
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
    return filterDB.getAgeFilter(currUserID).then((filter) => {
      expect(filter.state).toBe(filterData.getAgeFilterState(currUserID));
      expect(filter.minAge).toBe(filterData.getAgeFilter(currUserID).minAge);
      expect(filter.maxAge).toBe(filterData.getAgeFilter(currUserID).maxAge);
    });
  });

  it(`returns null if the user does not exist`, () => {
    const currUserID = 9999;
    return filterDB.getAgeFilter(currUserID).then((filter) => {
      expect(filter).toBeNull();
    });
  });

  it(`returns null if the user does not have an age filter`, () => {
    const currUserID = 3;
    return filterDB.getAgeFilter(currUserID).then((filter) => {
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

    return mysql.createConnection(MYSQLDB)
    .then((conn) => {
      return conn.query(filterQuery, [currUserID])
      .then((rows) => expect(rows).toHaveLength(0))
      .then(() => filterDB.saveAgeFilter(currUserID, newFilter))
      .then(() => conn.query(stateQuery, [currUserID]))
      .then((rows) => {
        expect(rows).toHaveLength(1);
        expect(rows[0].ageFilterState == 1).toBe(newFilter.state);
      })
      .then(() => conn.query(filterQuery, [currUserID]))
      .then((rows) => {
        expect(rows).toHaveLength(1);
        expect(rows[0].minAge).toBe(newFilter.minAge);
        expect(rows[0].maxAge).toBe(newFilter.maxAge);
      })
      .then(() => conn.end())
      .catch((err) => {
        conn.end();
        throw err;
      });
    });
  });

  it(`overwrites existing age filters`, () => {
    const currUserID = 1;
    const newFilter = { state: false, minAge: 666, maxAge: 777 };
    const stateQuery = `SELECT AgeFilterState AS ageFilterState FROM FilterState WHERE UserID = ?`;
    const filterQuery = `SELECT MinAge AS minAge, MaxAge AS maxAge FROM AgeFilter WHERE UserID = ?`;

    return mysql.createConnection(MYSQLDB)
    .then((conn) => {
      return conn.query(stateQuery, [currUserID])
      .then((rows) => expect(rows).toHaveLength(1))
      .then(() => conn.query(filterQuery, [currUserID]))
      .then((rows) => expect(rows).toHaveLength(1))
      .then(() => filterDB.saveAgeFilter(currUserID, newFilter))
      .then(() => conn.query(stateQuery, [currUserID]))
      .then((rows) => {
        expect(rows).toHaveLength(1);
        expect(rows[0].ageFilterState == 1).toBe(newFilter.state);
      })
      .then(() => conn.query(filterQuery, [currUserID]))
      .then((rows) => {
        expect(rows).toHaveLength(1);
        expect(rows[0].minAge).toBe(newFilter.minAge);
        expect(rows[0].maxAge).toBe(newFilter.maxAge);
      })
      .then(() => conn.end())
      .catch((err) => {
        conn.end();
        throw err;
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

    return filterDB.getGenderFilter(currUserID).then((filter) => {
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
    return filterDB.getGenderFilter(currUserID).then((filter) => {
      expect(filter).toBeNull();
    });
  });

  it(`returns null if the user does not have a gender filter`, () => {
    const currUserID = 3;
    return filterDB.getGenderFilter(currUserID).then((filter) => {
      expect(filter).toBeNull();
    });
  });
});


describe(`saveGenderFilter tests`, () => {
  beforeEach(() => insertFilterData());
  afterEach(() => deleteFilterData());

  it(`saves new gender filter`, () => {
    const currUserID = 3;
    const newFilter = { state: false, preference: [{ genderID: 1 }, { genderID: 2 }] };
    const stateQuery = `SELECT GenderFilterState AS genderFilterState FROM FilterState WHERE UserID = ?`;
    const filterQuery = `SELECT GenderID AS genderID FROM GenderFilter WHERE UserID = ?`;

    return mysql.createConnection(MYSQLDB)
    .then((conn) => {
      return conn.query(filterQuery, [currUserID])
      .then((rows) => expect(rows).toHaveLength(0))
      .then(() => filterDB.saveGenderFilter(currUserID, newFilter))
      .then(() => conn.query(stateQuery, [currUserID]))
      .then((rows) => {
        expect(rows).toHaveLength(1);
        expect(rows[0].genderFilterState == 1).toBe(newFilter.state);
      })
      .then(() => conn.query(filterQuery, [currUserID]))
      .then((rows) => {
        expect(rows).toHaveLength(newFilter.preference.length);
        rows.forEach((pref, i) => {
          expect(pref.genderID).toBe(newFilter.preference[i].genderID);
        });
      })
      .then(() => conn.end())
      .catch((err) => {
        conn.end();
        throw err;
      });
    });
  });

  it(`overwrites existing gender filter`, () => {
    const currUserID = 1;
    const newFilter = { state: false, preference: [{ genderID: 3 }] };
    const stateQuery = `SELECT GenderFilterState AS genderFilterState FROM FilterState WHERE UserID = ?`;
    const filterQuery = `SELECT GenderID AS genderID FROM GenderFilter WHERE UserID = ?`;

    return mysql.createConnection(MYSQLDB)
    .then((conn) => {
      return conn.query(stateQuery, [currUserID])
      .then((rows) => expect(rows).not.toHaveLength(0))
      .then(() => conn.query(filterQuery, [currUserID]))
      .then((rows) => expect(rows).not.toHaveLength(0))
      .then(() => filterDB.saveGenderFilter(currUserID, newFilter))
      .then(() => conn.query(stateQuery, [currUserID]))
      .then((rows) => {
        expect(rows).toHaveLength(1);
        expect(rows[0].genderFilterState == 1).toBe(newFilter.state);
      })
      .then(() => conn.query(filterQuery, [currUserID]))
      .then((rows) => {
        expect(rows).toHaveLength(newFilter.preference.length);
        rows.forEach((pref, i) => {
          expect(pref.genderID).toBe(newFilter.preference[i].genderID);
        });
      })
      .then(() => conn.end())
      .catch((err) => {
        conn.end();
        throw err;
      });
    });
  });

  it(`saves an empty gender filter`, () => {
    const currUserID = 1;
    const emptyFilter = { state: true, preference: [] };
    const genderFilterQuery = mysql.format(`SELECT * FROM GenderFilter WHERE UserID = ?;`, [currUserID]);

    return mysql.createConnection(MYSQLDB)
    .then((conn) => {
      return conn.query(genderFilterQuery)
      .then((rows) => expect(rows).not.toHaveLength(0))
      .then(() => filterDB.saveGenderFilter(currUserID, emptyFilter))
      .then(() => conn.query(genderFilterQuery))
      .then((rows) => expect(rows).toHaveLength(0))
      .then(() => conn.end())
      .catch((err) => {
        conn.end();
        throw err;
      });
    });
  });
  
  it(`it throws an error for users that don't exist`, () => {
    const currUserID = 9999;
    const someFilter = { state: true, preference: [{ genderID: 1 }] };
    expect(filterDB.saveGenderFilter(currUserID, someFilter)).rejects.toThrow();
  });
});


describe(`getEducationFilter tests`, () => {
  beforeAll(() => insertFilterData());
  afterAll(() => deleteFilterData());

  it(`returns the correct education filter for the user`, () => {
    const currUserID = 1;
    const expectedState = filterData.getEducationFilterState(currUserID);
    const expectedFilter = filterData.getEducationFilter(currUserID);

    return filterDB.getEducationFilter(currUserID).then((filter) => {
      expect(filter).toBeTruthy();
      expect(filter.state).toBe(expectedState);
      expect(filter.preference).toHaveLength(expectedFilter.preference.length);

      filter.preference.forEach((pref, i) => {
        expect(pref.educationID).toBe(expectedFilter.preference[i].educationID);
        expect(pref.educationName).toBe(expectedFilter.preference[i].educationName);
      });
    });
  });

  it(`returns null if the user does not exist`, () => {
    const currUserID = 9999;
    return filterDB.getEducationFilter(currUserID).then((filter) => {
      expect(filter).toBeNull();
    });
  });

  it(`returns null if the user does not have an education filter`, () => {
    const currUserID = 3;
    return filterDB.getEducationFilter(currUserID).then((filter) => {
      expect(filter).toBeNull();
    });
  });
});


describe(`saveEducationFilter tests`, () => {
  beforeEach(() => insertFilterData());
  afterEach(() => deleteFilterData());

  it(`saves new education filter`, () => {
    const currUserID = 3;
    const newFilter = { state: false, preference: [{ educationID: 1 }, { educationID: 2 }] };
    const stateQuery = `SELECT EducationFilterState AS educationFilterState FROM FilterState WHERE UserID = ?`;
    const filterQuery = `SELECT EducationID AS educationID FROM EducationFilter WHERE UserID = ?`;

    return mysql.createConnection(MYSQLDB)
    .then((conn) => {
      return conn.query(filterQuery, [currUserID])
      .then((rows) => expect(rows).toHaveLength(0))
      .then(() => filterDB.saveEducationFilter(currUserID, newFilter))
      .then(() => conn.query(stateQuery, [currUserID]))
      .then((rows) => {
        expect(rows).toHaveLength(1);
        expect(rows[0].educationFilterState == 1).toBe(newFilter.state);
      })
      .then(() => conn.query(filterQuery, [currUserID]))
      .then((rows) => {
        expect(rows).toHaveLength(newFilter.preference.length);
        rows.forEach((pref, i) => {
          expect(pref.educationID).toBe(newFilter.preference[i].educationID);
        });
      })
      .then(() => conn.end())
      .catch((err) => {
        conn.end();
        throw err;
      });
    });
  });

  it(`overwrites existing education filter`, () => {
    const currUserID = 1;
    const newFilter = { state: false, preference: [{ educationID: 1 }, { educationID: 2 }] };
    const stateQuery = `SELECT EducationFilterState AS educationFilterState FROM FilterState WHERE UserID = ?`;
    const filterQuery = `SELECT EducationID AS educationID FROM EducationFilter WHERE UserID = ?`;

    return mysql.createConnection(MYSQLDB)
    .then((conn) => {
      return conn.query(stateQuery, [currUserID])
      .then((rows) => expect(rows).not.toHaveLength(0))
      .then(() => conn.query(filterQuery, [currUserID]))
      .then((rows) => expect(rows).not.toHaveLength(0))
      .then(() => filterDB.saveEducationFilter(currUserID, newFilter))
      .then(() => conn.query(stateQuery, [currUserID]))
      .then((rows) => {
        expect(rows).toHaveLength(1);
        expect(rows[0].educationFilterState == 1).toBe(newFilter.state);
      })
      .then(() => conn.query(filterQuery, [currUserID]))
      .then((rows) => {
        expect(rows).toHaveLength(newFilter.preference.length);
        rows.forEach((pref, i) => {
          expect(pref.educationID).toBe(newFilter.preference[i].educationID);
        });
      })
      .then(() => conn.end())
      .catch((err) => {
        conn.end();
        throw err;
      });
    });
  });

  it(`saves an empty education filter`, () => {
    const currUserID = 1;
    const emptyFilter = { state: true, preference: [] };
    const educationFilterQuery = mysql.format(`SELECT * FROM EducationFilter WHERE UserID = ?;`, [currUserID]);

    return mysql.createConnection(MYSQLDB)
    .then((conn) => {
      return conn.query(educationFilterQuery)
      .then((rows) => expect(rows).not.toHaveLength(0))
      .then(() => filterDB.saveEducationFilter(currUserID, emptyFilter))
      .then(() => conn.query(educationFilterQuery))
      .then((rows) => expect(rows).toHaveLength(0))
      .then(() => conn.end())
      .catch((err) => {
        conn.end();
        throw err;
      });
    });
  });
  
  it(`it throws an error for users that don't exist`, () => {
    const currUserID = 9999;
    const someFilter = { state: true, preference: [{ educationID: 1 }] };
    expect(filterDB.saveEducationFilter(currUserID, someFilter)).rejects.toThrow();
  });
});
