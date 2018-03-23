import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import mockStore from '../__tests__/_config/mockStore';

import App from './App';

describe('App test', () => {
  const testData = [
    {
      userID: 1,
      userName: 'Mac Miller',
      age: 21,
      primaryPic: 'https://i.scdn.co/image/f4509fe9c589c12be5470653178f901bd697b97b',
      userBio: 'He raps, he does some other stuff too but mostly just that',
    }, {
      userID: 2,
      userName: 'Kendrick Lamar',
      age: 21,
      primaryPic: 'http://cache.umusic.com/_sites/kendricklamar.com/images/og.jpg',
      userBio: 'Bad dancer for real',
    }, {
      userID: 3,
      userName: 'SZA',
      age: 21,
      primaryPic: 'https://media.pitchfork.com/photos/59298fe813d1975652136c25/1:1/w_300/05bc322d.jpg',
      userBio: 'She is very hot',
    },
  ];

  const initialState = {
    recommendations: testData,
    matches: [],
  };
  const store = mockStore(initialState);

  it('renders without crashing', () => {
    fetch.mockResponseSuccess('{"data": []}');

    const rendered = renderer.create(<Provider store={store}><App /></Provider>).toJSON();

    expect(rendered).toMatchSnapshot();
  });
});

