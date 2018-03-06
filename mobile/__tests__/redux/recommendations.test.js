import mockStore from '../_config/mockStore';

import { recErrored, recFetchSuccess, recLoading, fetchRecommendations } from '../../src/actions/recommendations';
import { recommendations, recommendationsHasErrored, recommendationsIsLoading } from '../../src/reducers/recommendations';

const initialState = {
  loading: false,
  error: false,
  recommendations: [],
};

describe('Reducers::Recommendations', () => {
  const store = mockStore(initialState);

  it('should respond to loading action', () => {
    expect(recommendationsIsLoading(initialState, recLoading(true))).toEqual(true);
    expect(recommendationsIsLoading(initialState, recLoading(false))).toEqual(false);
  });

  it('should respond to error action', () => {
    expect(recommendationsHasErrored(initialState, recErrored(true))).toEqual(true);
    expect(recommendationsHasErrored(initialState, recErrored(false))).toEqual(false);
  });

  it('should respond to matches actions', () => {
    const data = [1, 2, 3];
    expect(recommendations(initialState, recFetchSuccess(null))).toEqual(null);
    expect(recommendations(initialState, recFetchSuccess(data))).toEqual(data);
  });
});

describe('Actions::Recommendations', () => {
  const store = mockStore(initialState);

  beforeEach(() => {
    store.clearActions();
  });

  it('should handle fetching data - send correct actions', async () => {
    const response = '{"data": []}';
    fetch.mockResponseSuccess(response);
    await store.dispatch(fetchRecommendations());

    expect(store.getActions()).toMatchSnapshot();
  });

  it('should handle fetching data - getting an error', async () => {
    fetch.mockResponseFailure(new Error('I am a bad bad error'));
    await store.dispatch(fetchRecommendations());

    expect(store.getActions()).toMatchSnapshot();
  });
});

