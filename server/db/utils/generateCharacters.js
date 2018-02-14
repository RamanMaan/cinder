const fs = require('fs');
const request = require('request-promise');
const cheerio = require('cheerio');
const refData = require('../referenceData');

// Variables for building animal crossing characters
const URI = 'http://animalcrossing.wikia.com/wiki/Villager_list_(New_Leaf)';
const MIN_BIRTHDAY_YEAR = 1975;
const MAX_BIRTHDAY_YEAR = 2000;

// SEEDED-RNG - To ensure test data generates same response each time
Math.seed = s => () => {
  s = Math.sin(s) * 10000;
  return s - Math.floor(s);
};

const stringToInt = str => (str.split('').map(x => x.charCodeAt(0)).join(''));

const genRandomNumber = (min, max, seed) => (Math.floor((Math.seed(stringToInt(seed))() * (max - min)) + min));

const genBirthday = (name, day) => {
  const date = new Date(day);
  date.setFullYear(genRandomNumber(MIN_BIRTHDAY_YEAR, MAX_BIRTHDAY_YEAR, name));
  return date.toISOString().split('T')[0];
};

const genEducation = (name) => {
  const eduTypes = refData.education;
  return eduTypes[genRandomNumber(0, eduTypes.length, name)];
};

const genStudy = (name, edu) => {
  const studyTypes = refData.study;
  return edu === 0 ? undefined : studyTypes[genRandomNumber(0, studyTypes.length, name)];
};

request.get({ uri: URI })
  .then(html => cheerio.load(html))
  .then(($) => {
    const json = [];

    $('table.roundy.sortable > tbody > tr').each((index, el) => {
      if (index === 0) return;
      const data = Array.from(el.children).filter(x => x.type !== 'text');
      const name = data[0].children[1].firstChild.attribs.title.split('(')[0].trim();
      const personality = data[2].children[1].attribs.title;
      const catchPhrase = data[5].children[1].firstChild.data.split('"')[1];
      const species = data[3].children[1].attribs.title;
      const education = genEducation(name);
      json.push({
        name,
        education,
        img: data[1].children[1].attribs.href,
        gender: data[2].children[1].firstChild.data.indexOf('♀') ? 'Female' : 'Male',
        birthday: genBirthday(name, data[4].firstChild.data.trim()),
        bio: `This is the bio for ${name}! I have a ${personality} personality, and my catch phrase is ${catchPhrase}! I am a ${species}.`,
        area_study: genStudy(name, education),
      });
    });

    return JSON.stringify(json);
  }).then((data) => {
    fs.writeFile('characters.json', data, 'utf8', (err) => {
      if (err) throw err;
      console.log('File written');
    });
  });
