import React from 'react';
import { shallow, mount } from 'enzyme';
import fetchMock from 'fetch-mock';

import App from './App';
import { Recommendation } from './Recommendation';
import UserDetail from '../components/UserDetail';

describe('<Recommendation />', () => {
  let wrapper;
  let mockRecommendations = [
    { userName: 'A', primaryPic: 'A' },
    { userName: 'B', primaryPic: 'B' },
    { userName: 'C', primaryPic: 'C' }
  ].map((x, i) => ({ userID: i, age: i, userBio: `Bio:${x.userName}`, ...x }));
  let mockFetchRecommends = jest.fn();
  let mockPopRecommend = jest.fn();
  let mockSubmitRecommendation = jest.fn();

  beforeEach(() => {
    wrapper = mount(
      <Recommendation
        recommendations={mockRecommendations}
        fetchRecommends={mockFetchRecommends}
        popRecommend={mockPopRecommend}
        submitRecommendation={mockSubmitRecommendation}
      />
    );
    fetchMock.reset();
    fetchMock.restore();
    fetchMock.post(/\/api\/users\/[0-9]*\/matches\/[a-z]*/, []);
  });

  it('should fetch recommendations on render', () => {
    expect(mockFetchRecommends.mock.calls.length).toBe(1);
    expect(mockSubmitRecommendation.mock.calls.length).toBe(0);
    expect(mockPopRecommend.mock.calls.length).toBe(0);
  });

  it('should show the <UserDetail /> component', () => {
    expect(wrapper.find(UserDetail)).toHaveLength(1);
  });

  describe('going through all recommendations', () => {
    beforeAll(() => {
      mockFetchRecommends = jest.fn();
      mockSubmitRecommendation = jest.fn();
      mockPopRecommend = jest.fn();
    });

    it('should show the first recommendation in the list', () => {
      expect(
        wrapper
          .find(UserDetail)
          .find('div.header')
          .text()
      ).toEqual('A, 0');
      expect(mockFetchRecommends.mock.calls.length).toBe(1);
      expect(mockSubmitRecommendation.mock.calls.length).toBe(0);
      expect(mockPopRecommend.mock.calls.length).toBe(0);

      wrapper.find('Button.hot').simulate('click');

      mockRecommendations = mockRecommendations.slice(1);
      wrapper = mount(
        <Recommendation
          recommendations={mockRecommendations}
          fetchMatches={mockSubmitRecommendation}
          fetchRecommends={mockFetchRecommends}
          popRecommend={mockPopRecommend}
        />
      );

      expect(mockFetchRecommends.mock.calls.length).toBe(2);
      expect(mockSubmitRecommendation.mock.calls.length).toBe(1);
      expect(mockPopRecommend.mock.calls.length).toBe(1);
    });

    it('should show the second recommendation in the list', () => {
      expect(
        wrapper
          .find(UserDetail)
          .find('div.header')
          .text()
      ).toEqual('B, 1');
      expect(mockFetchRecommends.mock.calls.length).toBe(3);
      expect(mockSubmitRecommendation.mock.calls.length).toBe(1);
      expect(mockPopRecommend.mock.calls.length).toBe(1);
    });

    it('should be displaying empty', () => {
      wrapper = mount(
        <Recommendation
          recommendations={[]}
          fetchMatches={mockSubmitRecommendation}
          fetchRecommends={mockFetchRecommends}
          popRecommend={mockPopRecommend}
        />
      );

      expect(wrapper.text()).toEqual('There is no one new around you :(');
      expect(mockFetchRecommends.mock.calls.length).toBe(5);
      expect(mockSubmitRecommendation.mock.calls.length).toBe(1);
      expect(mockPopRecommend.mock.calls.length).toBe(1);
    });
  });
});
