require('dotenv').load();
require('require-sql');
const mysql = require('promise-mysql');
const testData = require('../../testdata.json');

const MYSQLDB = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
};

console.log('╔══════════════════════════════╗');
console.log('║ Adding test data to database ║');
console.log('╚══════════════════════════════╝');

const buildPairs = (val, index) => `(${index + 1}, '${val}')`;
const prepareQuery = (arr, map) => (arr.map(map).join(', '));

const users = testData.users.map(x => `(${x.id}, '${x.email}', '${x.password}')`).join(', ');
const usersInfo = testData.users.map(x => `(${x.id}, '${x.name}', '${x.birthday}', ${x.gender}, ${x.location.lat}, ${x.location.long}, '${x.bio}')`).join(', ');
const study = testData.users.map(x => `(${x.id}, ${x.study}, ${x.education})`).join(', ');
const pictures = testData.users.map((x, i) => `(${i + 1}, ${x.id}, '${x.imgs[0]}', 1)`).join(', ');

const userQueries = [
  `INSERT INTO Users (UserID, UserEmail, UserPassword) VALUES ${users};`,
  `INSERT INTO UsersInfo (UserID, UserName, Birthday, GenderID, Latitude, Longitude, Bio) VALUES ${usersInfo};`,
  `INSERT INTO UserStudy (UserID, StudyID, EducationID) VALUES ${study};`,
  `INSERT INTO UserPicture (PictureID, UserID, PicturePath, PrimaryPicture) VALUES ${pictures};`,
];

const matches = testData.matches.map(x => `(${x.user1}, ${x.user2}, '${x.action}', '${x.date}')`).join(', ');

const otherQueries = [
  `INSERT INTO Likes (User1ID, User2ID, UserAction, ActionDate) VALUES ${matches};`,
];

mysql.createConnection({
  host: MYSQLDB.host,
  user: MYSQLDB.user,
  password: MYSQLDB.password,
  database: MYSQLDB.database,
  multipleStatements: true,
}).then((conn) => {
  console.log('---Connected to database---');

  const res = conn.query([...userQueries, ...otherQueries].join('\n'));
  conn.end();
  return res;
}).then(() => console.log('---Successfully added test data---'))
  .catch((err) => {
    console.error(err.message);
  });
