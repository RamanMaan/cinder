import React from 'react';
import renderer from 'react-test-renderer';

import MatchesListItem from './MatchesListItem';

describe('<MatchesListItem />', () => {
  const testData = {
    title: 'Example title',
    subtitle: 'Some subtitle',
    date: new Date('01/01/2017'),
    img: 'img',
  };

  it('renders correctly', () => {
    const rendered = renderer.create(<MatchesListItem {...testData} />).toJSON();
    expect(rendered).toMatchSnapshot();
  });
});
