import mockStore from '../_config/mockStore';

import { matchesFetchData, matchesLoading, matchesErrored, matchesFetchSuccess } from '../../src/actions/matches';
import { matches, matchesHasErrored, matchesIsLoading } from '../../src/reducers/matches';

const initialState = {
  loading: false,
  error: false,
  matches: [],
};

describe('Reducers::Matches', () => {
  const store = mockStore(initialState);

  it('should respond to loading action', () => {
    expect(matchesIsLoading(initialState, matchesLoading(true))).toEqual(true);
    expect(matchesIsLoading(initialState, matchesLoading(false))).toEqual(false);
  });

  it('should respond to error action', () => {
    expect(matchesHasErrored(initialState, matchesErrored(true))).toEqual(true);
    expect(matchesHasErrored(initialState, matchesErrored(false))).toEqual(false);
  });

  it('should respond to matches actions', () => {
    const data = [1, 2, 3];
    expect(matches(initialState, matchesFetchSuccess(null))).toEqual(null);
    expect(matches(initialState, matchesFetchSuccess(data))).toEqual(data);
  });
});

describe('Actions::Matches', () => {
  const store = mockStore(initialState);

  beforeEach(() => {
    store.clearActions();
  });

  it('should handle fetching data - send correct actions', async () => {
    const response = '{"data": []}';
    fetch.mockResponseSuccess(response);
    await store.dispatch(matchesFetchData());

    expect(store.getActions()).toMatchSnapshot();
  });

  it('should handle fetching data - getting an error', async () => {
    fetch.mockResponseFailure(new Error('I am a bad bad error'));
    await store.dispatch(matchesFetchData());

    expect(store.getActions()).toMatchSnapshot();
  });
});

