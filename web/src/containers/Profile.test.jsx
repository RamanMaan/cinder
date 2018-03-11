import React from 'react';
import { mount } from 'enzyme';
import renderer from 'react-test-renderer';
import fetchMock from 'fetch-mock';

import { Profile } from './Profile';

describe('<Profile />', () => {
  const testProfile = {
    Bio: 'This is a test bio for a test user',
    Birthday: '1991-10-18T05:00:00.000Z',
    UserName: 'Test User'
  };

  fetchMock.get(/\/api\/ref\/[a-z]*/, []);

  describe('Snapshot tests', () => {
    it('should be hidden if view is false', () => {
      const component = renderer.create(<Profile fetchData={jest.fn()} />);
      expect(component).toMatchSnapshot();
    });

    it('should display if profile properties are all empty', () => {
      const component = renderer.create(
        <Profile
          view
          fetchData={jest.fn()}
          profile={{ Bio: null, Birthday: null, UserName: null }}
        />
      );
      expect(component).toMatchSnapshot();
    });

    it('should display profile properties by default', () => {
      const component = renderer.create(
        <Profile view fetchData={jest.fn()} profile={testProfile} />
      );
      expect(component).toMatchSnapshot();
    });
  });

  describe('Enzyme tests', () => {
    let wrapper;
    let mockFetchData;
    let mockClickHandler;

    beforeEach(() => {
      mockFetchData = jest.fn();
      mockClickHandler = jest.fn();
      wrapper = mount(
        <Profile
          profile={testProfile}
          fetchData={mockFetchData}
          clickHandler={mockClickHandler}
        />
      );
    });

    it('should fetch data on mount', () => {
      expect(mockFetchData.mock.calls.length).toBe(1);
    });
  });
});
