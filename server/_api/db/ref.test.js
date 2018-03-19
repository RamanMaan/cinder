/**
 * Test suite for the functions at ref.js
 */
require('dotenv').load();
const mysql = require('promise-mysql');
const refDB = require('./ref');
const refData = require('../../db/referenceData');

it(`returns all available gender reference data`, () => {
  return refDB.getGender().then(genderRefs => {
    expect(genderRefs).toHaveLength(refData.GenderType.length);
    genderRefs.forEach((gref, i) => {
      expect(gref.id).toBe(i + 1);
      expect(gref.value).toBe(refData.GenderType[i]);
    });
  });
});
