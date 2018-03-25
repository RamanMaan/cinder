const fs = require('fs');
const request = require('request-promise');
const cheerio = require('cheerio');
const bcrypt = require('bcrypt');
const refData = require('../referenceData');

// Variables for building animal crossing characters
const URI = 'http://animalcrossing.wikia.com/wiki/Villager_list_(New_Leaf)';
const MIN_BIRTHDAY_YEAR = 1990;
const MAX_BIRTHDAY_YEAR = 2000;
const MIN_MATCH_DATE = new Date('01/01/2017');
const MAX_MATCH_DATE = new Date('02/15/2018');

// SEEDED-RNG - To ensure test data generates same response each time
Math.seed = s => () => {
  s = Math.sin(s) * 10000;
  return s - Math.floor(s);
};
const stringToInt = str =>
  str
    .split('')
    .map(x => x.charCodeAt(0))
    .join('');

const genRandomNumber = (min, max, seed) =>
  Math.floor(Math.seed(stringToInt(seed))() * (max - min) + min);

const genBirthday = (name, day) => {
  const date = new Date(day);
  date.setFullYear(genRandomNumber(MIN_BIRTHDAY_YEAR, MAX_BIRTHDAY_YEAR, name));
  return date.toISOString().split('T')[0];
};
const genMatchDate = name =>
  new Date(
    genRandomNumber(MIN_MATCH_DATE.getTime(), MAX_MATCH_DATE.getTime(), name)
  );

const genEducation = name => {
  const eduTypes = refData.EducationType;
  return eduTypes[genRandomNumber(0, eduTypes.length, name)];
};

const escapeSQL = val => {
  val = val.replace(/[\0\n\r\b\t\\'"\x1a]/g, s => {
    switch (s) {
      case '\0':
        return '\\0';
      case '\n':
        return '\\n';
      case '\r':
        return '\\r';
      case '\b':
        return '\\b';
      case '\t':
        return '\\t';
      case '\x1a':
        return '\\Z';
      case "'":
        return "''";
      case '"':
        return '""';
      default:
        return `\\${s}`;
    }
  });

  return val;
};

class UserBuilder {
  constructor(name, birthday, gender, img, bio, education) {
    // Users Table Info
    this.email = name
      .toLowerCase()
      .split(' ')
      .join('_')
      .concat('@email.com');
    this.password = bcrypt.hashSync('password', 1);
    // UsersInfo Table Info
    this.name = name;
    this.birthday = birthday;
    this.gender =
      refData.GenderType.findIndex(
        x => x.toLowerCase() === gender.toLowerCase()
      ) + 1;
    this.location = { lat: 49.880488, long: -97.161546 };
    this.bio = bio || `Bio of user ${name}`;
    // Pictures
    this.imgs = Array.isArray(img) ? img : [img];
    // Education and Study
    this.education = education
      ? refData.EducationType.findIndex(
          x => x.toLowerCase() === education.toLowerCase()
        ) + 1
      : undefined;
  }
}

class MatchMaker {
  constructor(user1, user2) {
    this.user1 = user1.id;
    this.user2 = user2.id;
    this.action = genRandomNumber(0, 2, user1.name) === 0 ? 'L' : 'P';
    this.date = genMatchDate(user1.name + user2.name)
      .toISOString()
      .slice(0, 19)
      .replace('T', ' ');
  }
}

// scrape animal crossing wiki data
request
  .get({ uri: URI })
  .then(html => cheerio.load(html))
  .then($ => {
    const users = [];

    $('table.roundy.sortable > tbody > tr').each((index, el) => {
      if (index === 0) return;
      const data = Array.from(el.children).filter(x => x.type !== 'text');

      const personality = escapeSQL(data[2].children[1].attribs.title);
      const catchPhrase = escapeSQL(
        data[5].children[1].firstChild.data.split('"')[1]
      );
      const species = escapeSQL(data[3].children[1].attribs.title);

      const name = escapeSQL(
        data[0].children[1].firstChild.attribs.title.split('(')[0].trim()
      );
      const birthday = genBirthday(name, data[4].firstChild.data.trim());
      const gender = data[2].children[1].firstChild.data.indexOf('♀')
        ? 'Female'
        : 'Male';
      const img = data[1].children[1].attribs.href;
      const bio = `This is the bio for ${name}! I have a ${personality} personality, and my catch phrase is ${catchPhrase}! I am a ${species}.`;
      const education = genEducation(name);

      users.push(new UserBuilder(name, birthday, gender, img, bio, education));
    });

    return users.map((x, i) => {
      x.id = i + 1;
      return x;
    });
  })
  .then(users => {
    const matchedUsers = users.filter(x => x.id % 3 === 0);
    const matches = matchedUsers.reduce((totalMatches, curr, i, arr) => {
      const set = arr
        .filter(x => x.id % 3 === i % 3)
        .reduce((setMatches, x) => {
          if (x.name === curr.name) return setMatches;
          return [new MatchMaker(x, curr), ...setMatches];
        }, []);
      return [...set, ...totalMatches];
    }, []);
    return JSON.stringify({ users, matches });
  })
  .then(data => {
    fs.writeFile('testdata.json', data, 'utf8', err => {
      if (err) throw err;
      console.log('File written');
    });
  });
