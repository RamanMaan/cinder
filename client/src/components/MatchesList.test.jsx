import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

import MatchesList from './MatchesList';

describe('<MatchesList />', () => {
  const testMatches = ['A', 'B', 'C', 'D', 'E'].map((x, index) => ({
    id: index,
    title: x,
    subtitle: x,
    img: x,
    date: new Date(`01/0${index + 1}/2018`)
  }));

  it('renders without crashing', () => {
    // simple smoke test
    shallow(<MatchesList />);
  });

  it('renders with no matches correctly', () => {
    const component = renderer.create(<MatchesList />).toJSON();
    expect(component).toMatchSnapshot();
  });

  it('renders with matches correctly', () => {
    const component = renderer
      .create(<MatchesList matches={testMatches} />)
      .toJSON();
    expect(component).toMatchSnapshot();
  });
});
