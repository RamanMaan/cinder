require('../../utils/env').loadEnvFile();
require('require-sql');
const mysql = require('promise-mysql');
const setupFile = require('../setup.sql');
const refData = require('../referenceData');

const MYSQLDB = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  rootUser: 'root',
  rootPass: process.env.MYSQL_ROOT_PASS,
};

const buildPairs = (val, index) => `(${index + 1}, '${val}')`;
const prepareQuery = arr => (arr.map(buildPairs).join(', '));

// don't need to escape values - we're the only people writing these queries
const refTableQueries = [
  `INSERT INTO GenderType (GenderID, GenderType) VALUES ${prepareQuery(refData.GenderType)};`,
  `INSERT INTO EducationType (EducationID, EducationType) VALUES ${prepareQuery(refData.EducationType)};`,
  `INSERT INTO StudyType (StudyID, StudyType) VALUES ${prepareQuery(refData.StudyType)};`,
  `INSERT INTO ReligionType (ReligionID, ReligionType) VALUES ${prepareQuery(refData.ReligionType)};`,
  `INSERT INTO InterestsType (InterestID, InterestType) VALUES ${prepareQuery(refData.InterestsType)};`,
];

console.log('╔═══════════════════════╗');
console.log('║ Initializing Database ║');
console.log('╚═══════════════════════╝');

mysql.createConnection({
  host: MYSQLDB.host,
  user: MYSQLDB.rootUser,
  password: MYSQLDB.rootPass,
}).then((conn) => {
  console.log('---Connected to MYSQL---');
  const res = conn.query('CREATE DATABASE IF NOT EXISTS ??', [MYSQLDB.database]);
  conn.end();
  return res;
}).then(() => {
  console.log(`---Created ${MYSQLDB.database} database---`);
  return mysql.createConnection({
    host: MYSQLDB.host,
    user: 'root',
    password: MYSQLDB.rootPass,
    database: MYSQLDB.database,
    multipleStatements: true,
  });
}).then((conn) => {
  console.log(`---Connected to ${MYSQLDB.database} database---`);
  const res = conn.query(
    'CREATE USER IF NOT EXISTS ??@?? IDENTIFIED BY ?; GRANT ALL PRIVILEGES ON ??.* TO ??@?? WITH GRANT OPTION;'
    , [MYSQLDB.user, MYSQLDB.host, MYSQLDB.password, MYSQLDB.database, MYSQLDB.user, MYSQLDB.host],
  );
  conn.end();
  return res;
})
  .then(() => {
    console.log(`---Created ${MYSQLDB.user} user---`);
    return mysql.createConnection({
      host: MYSQLDB.host,
      user: MYSQLDB.user,
      password: MYSQLDB.password,
      database: MYSQLDB.database,
      multipleStatements: true,
    });
  })
  .then((conn) => {
    console.log('╔═══════════════════════════╗\n║ Database and User Created ║\n╚═══════════════════════════╝\nBe sure to set your .env file accordingly.');
    console.log('---Building database schemas from setup.sql---');

    const res = conn.query(setupFile);
    conn.end();

    return res;
  })
  .then(() => mysql.createConnection({
    host: MYSQLDB.host,
    user: MYSQLDB.user,
    password: MYSQLDB.password,
    database: MYSQLDB.database,
    multipleStatements: true,
  }))
  .then((conn) => {
    console.log('---Loading reference tables---');
    conn.query(refTableQueries.join('\n'));
    return conn.end();
  })
  .then(() => console.log('╔═════════════════════╗\n║ Database initalized ║\n╚═════════════════════╝'))
  .catch((err) => {
    console.error(err.message);
  });
