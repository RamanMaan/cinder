const gulp = require('gulp');
const fs = require('fs');
const request = require('request-promise');
const cheerio = require('cheerio');

// Variables for building animal crossing characters
const URI = 'http://animalcrossing.wikia.com/wiki/Villager_list_(New_Leaf)';
const MIN_BIRTHDAY_YEAR = 1985;
const MAX_BIRTHDAY_YEAR = 2001;

gulp.task('build:characters', () => {
  Math.seed = s => () => {
    s = Math.sin(s) * 10000;
    return s - Math.floor(s);
  };

  const genRandomNumber = (min, max, seed) => (Math.seed(seed.split('').map(x => x.charCodeAt(0)).join(''))() * (max - min)) + min;

  const genBirthday = (name, day) => {
    const date = new Date(day);
    date.setFullYear(Math.floor(genRandomNumber(MIN_BIRTHDAY_YEAR, MAX_BIRTHDAY_YEAR, name)));
    return date.toISOString().split('T')[0];
  };

  request.get({ uri: URI })
    .then(html => cheerio.load(html))
    .then(($) => {
      const json = [];

      $('table.roundy.sortable > tbody > tr').each((index, el) => {
        if (index === 0) return;
        const data = Array.from(el.children).filter(x => x.type !== 'text');
        const name = data[0].children[1].firstChild.attribs.title.split('(')[0].trim();
        json.push({
          name,
          img: data[1].children[1].attribs.href,
          gender: data[2].children[1].firstChild.data.indexOf('♀') ? 'FEMALE' : 'MALE',
          personality: data[2].children[1].attribs.title,
          species: data[3].children[1].attribs.title,
          birthday: genBirthday(name, data[4].firstChild.data.trim()),
          catch_phrase: data[5].children[1].firstChild.data.split('"')[1],
        });
      });

      return JSON.stringify(json);
    }).then((data) => {
      fs.writeFile('characters.json', data, 'utf8', (err) => {
        if (err) throw err;
        console.log('File written');
      });
    });
});
