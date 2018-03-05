import React from 'react';
import renderer from 'react-test-renderer';

import Login from './Login';

it('renders without crashing', () => {
  const rendered = renderer.create(<Login />).toJSON();
  expect(rendered).toMatchSnapshot();
});
