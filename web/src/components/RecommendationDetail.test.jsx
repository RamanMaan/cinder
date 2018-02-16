import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

import RecommendationDetail from './RecommendationDetail';

describe('<RecommendationDetail />', () => {
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
    shallow(<RecommendationDetail />);
  });

  it('renders with empty props correctly', () => {
    const component = renderer.create(<RecommendationDetail />).toJSON();
    expect(component).toMatchSnapshot();
  });

  it('renders with props correctly', () => {
    const component = renderer
      .create(<RecommendationDetail userDetail={testData} />)
      .toJSON();
    expect(component).toMatchSnapshot();
  });
});
