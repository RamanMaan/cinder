import React from 'react';
import { mount } from 'enzyme';

import { MatchesList } from './MatchesList';

describe('<MatchesList />', () => {
  let wrapper;
  const testMatches = ['A', 'B', 'C', 'D', 'E'].map((x, index) => ({
    userID: index,
    userName: x,
    userBio: x,
    primaryPic: x,
    matchDate: new Date(`01/0${index + 1}/2018`)
  }));

  let mockFetchData = jest.fn();
  let mockClickHandler = jest.fn();

  beforeEach(() => {
    wrapper = mount(
      <MatchesList
        matches={testMatches}
        fetchData={mockFetchData}
        clickHandler={mockClickHandler}
      />
    );
  });

  it('should display all matches', () => {
    wrapper
      .find('.MatchesListItem')
      .find('span.title')
      .forEach(title => {
        expect(testMatches.find(match => match.userName === title.text()));
      });

    expect(mockFetchData.mock.calls.length).toBe(1);
    expect(mockClickHandler.mock.calls.length).toBe(0);
  });
});
