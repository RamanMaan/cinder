import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

import MatchesListItem from './MatchesListItem';

describe('<MatchesListItem />', () => {
  const testData = {
    title: 'Example title',
    subtitle: 'Some subtitle',
    date: new Date('01/01/2017'),
    img: 'img'
  };

  it('renders without crashing', () => {
    // simple smoke test
    shallow(<MatchesListItem />);
  });

  it('renders with empty props correctly', () => {
    const component = renderer.create(<MatchesListItem />).toJSON();
    expect(component).toMatchSnapshot();
  });

  it('renders with props correctly', () => {
    const component = renderer
      .create(
        <MatchesListItem
          title={testData.title}
          subtitle={testData.subtitle}
          img={testData.img}
          date={testData.date}
        />
      )
      .toJSON();
    expect(component).toMatchSnapshot();
  });
});
