import React from 'react';
import renderer from 'react-test-renderer';

import Profile from './profile';

it('renders without crashing', () => {
  const rendered = renderer.create(<Profile />).toJSON();
  expect(rendered).toMatchSnapshot();
});
