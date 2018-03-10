import React from 'react';
import renderer from 'react-test-renderer';

import { MatchesList } from './MatchesList';

describe('<MatchesList />', () => {
  const testData = ['A', 'B', 'C', 'D', 'E'].map((x, index) => ({
    userID: index,
    userName: x,
    userBio: x,
    primaryPic: x,
    matchDate: new Date(`01/0${index + 1}/2018`),
  }));

  const mockFetch = jest.fn();

  it('renders when empty', () => {
    const rendered = renderer.create(<MatchesList matches={[]} fetchData={mockFetch} />).toJSON();
    expect(rendered).toMatchSnapshot();
  });

  it('renders when loading', () => {
    const rendered = renderer.create(<MatchesList loading fetchData={mockFetch} />).toJSON();
    expect(rendered).toMatchSnapshot();
  });

  it('renders when errored', () => {
    const rendered = renderer.create(<MatchesList errored fetchData={mockFetch} />).toJSON();
    expect(rendered).toMatchSnapshot();
  });

  it('renders with matches', () => {
    const rendered = renderer.create(<MatchesList matches={testData} fetchData={mockFetch} />).toJSON();
    expect(rendered).toMatchSnapshot();
  });
});
