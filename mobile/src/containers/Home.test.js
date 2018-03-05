import React from 'react';
import renderer from 'react-test-renderer';

import { Home } from './home';

describe('<Home />', () => {
  let wrapper;
  const mockRecommendations = [
    { userName: 'A', primaryPic: 'A' },
    { userName: 'B', primaryPic: 'B' },
    { userName: 'C', primaryPic: 'C' },
  ].map((x, i) => ({
    userID: i, age: i, userBio: `Bio:${x.userName}`, ...x,
  }));
  const mockFetchRecommends = jest.fn();

  it('should render when empty', () => {
    // const rendered = renderer.create(<Home />).toJSON();
    // expect(rendered).toMatchSnapshot();
  });

  it('renders with data', () => {
    // const rendered = renderer.create(<Home />).toJSON();
    // expect(rendered).toMatchSnapshot();
  });
});
