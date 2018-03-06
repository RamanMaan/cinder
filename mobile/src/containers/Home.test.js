import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import mockStore from '../../__tests__/_config/mockStore';

import { Home } from './Home';

describe('<Home />', () => {
  const mockRecommendations = [
    { userName: 'A', primaryPic: 'A' },
    { userName: 'B', primaryPic: 'B' },
    { userName: 'C', primaryPic: 'C' },
  ].map((x, i) => ({
    userID: i, age: i, userBio: `Bio:${x.userName}`, ...x,
  }));

  let mockFetchRecommends = jest.fn();

  const initialState = {};

  const store = mockStore(initialState);

  beforeEach(() => {
    mockFetchRecommends = jest.fn();
  });

  it('should render with error', () => {
    const rendered = renderer.create(<Provider store={store}><Home errored fetchRecommends={mockFetchRecommends} /></Provider>).toJSON();
    expect(rendered).toMatchSnapshot();
    expect(mockFetchRecommends.mock.calls.length).toBe(1);
  });

  it('should render with loading', () => {
    const rendered = renderer.create(<Provider store={store}><Home loading fetchRecommends={mockFetchRecommends} /></Provider>).toJSON();
    expect(rendered).toMatchSnapshot();
    expect(mockFetchRecommends.mock.calls.length).toBe(1);
  });

  it('should render when empty', () => {
    const rendered = renderer.create(<Provider store={store}><Home recommendations={[]} fetchRecommends={mockFetchRecommends} /></Provider>).toJSON();
    expect(rendered).toMatchSnapshot();
    expect(mockFetchRecommends.mock.calls.length).toBe(1);
  });

  it('renders with data', () => {
    const rendered = renderer.create(<Provider store={store}><Home recommendations={mockRecommendations} fetchRecommends={mockFetchRecommends} /></Provider>).toJSON();
    expect(rendered).toMatchSnapshot();
    expect(mockFetchRecommends.mock.calls.length).toBe(1);
  });
});
