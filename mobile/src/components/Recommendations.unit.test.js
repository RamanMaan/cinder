import React from 'react';
import renderer from 'react-test-renderer';

import Recommendations from './Recommendations';

const testData = [
  {
    text: 'Card Uno',
    name: 'Mac Miller',
    age: 21,
    image: 'https://i.scdn.co/image/f4509fe9c589c12be5470653178f901bd697b97b',
  }, {
    text: 'Card Two',
    name: 'Kendrick Lamar',
    age: 21,
    image: 'http://cache.umusic.com/_sites/kendricklamar.com/images/og.jpg',
  }, {
    text: 'Card Three',
    name: 'SZA',
    age: 21,
    image: 'https://media.pitchfork.com/photos/59298fe813d1975652136c25/1:1/w_300/05bc322d.jpg',
  },
];

it('renders when empty', () => {
  const rendered = renderer.create(<Recommendations data={[]} />).toJSON();
  expect(rendered).toMatchSnapshot();
});

it('renders with cards', () => {
  const rendered = renderer.create(<Recommendations data={testData} />).toJSON();
  expect(rendered).toMatchSnapshot();
});
