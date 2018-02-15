import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

import UserDetail from './UserDetail';

describe('<UserDetail />', () => {
  const testData = {
    userName: 'Abc Defg',
    userAge: 22,
    userGender: 'Male',
    userBio: 'I am test user with test bio',
    userPics:
      'http://markinternational.info/data/out/613/224320906-pic-of-animals.jpg',
    matchTime: new Date(2018, 2, 5, 16, 23, 15),
    matchNote: 'This is some test notes only related about this match'
  };

  it('renders without crashing', () => {
    // simple smoke test
    shallow(<UserDetail />);
  });

  it('renders with empty props correctly', () => {
    const component = renderer.create(<UserDetail />).toJSON();
    expect(component).toMatchSnapshot();
  });

  it('renders with props correctly', () => {
    const component = renderer
      .create(<UserDetail userDetail={testData} />)
      .toJSON();
    expect(component).toMatchSnapshot();
  });
});
