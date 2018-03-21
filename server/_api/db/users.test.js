/**
 * Test suite for the functions at users.js
 */

require('dotenv').load();
const mysql = require('promise-mysql');
const usersDB = require('./users');
const usersData = require('./users.testdata');
const testUtils = require('./utils/testutils');

const MYSQLDB = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  multipleStatements: true,
};

