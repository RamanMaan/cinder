import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

import PotentialMatchDetail from './PotentialMatchDetail';

describe('<PotentialMatchDetail />', () => {
  const testData = {
    userName: 'Abc Defg',
    userAge: 22,
    userGender: 'Male',
    userBio: 'I am test user with test bio',
    userPics:
      'http://markinternational.info/data/out/613/224320906-pic-of-animals.jpg'
  };

  it('renders without crashing', () => {
    // simple smoke test
    shallow(<PotentialMatchDetail />);
  });

  it('renders with empty props correctly', () => {
    const component = renderer.create(<PotentialMatchDetail />).toJSON();
    expect(component).toMatchSnapshot();
  });

  it('renders with props correctly', () => {
    const component = renderer
      .create(<PotentialMatchDetail userDetail={testData} />)
      .toJSON();
    expect(component).toMatchSnapshot();
  });
});
