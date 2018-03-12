import React from 'react';
import { mount } from 'enzyme';
import renderer from 'react-test-renderer';
import fetchMock from 'fetch-mock';
import sinon from 'sinon';

import { Profile } from './Profile';

describe('<Profile />', () => {
  const testProfile = {
    Bio: 'This is a test bio for a test user',
    Birthday: '1991-10-18T05:00:00.000Z',
    UserName: 'Test User'
  };

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
          view
          profile={testProfile}
          fetchData={mockFetchData}
          clickHandler={mockClickHandler}
        />
      );
    });

    it('should fetch profile data on mount', () => {
      expect(mockFetchData.mock.calls.length).toBe(1);
    });

    describe('Gender Filter', () => {
      let genderFilter;
      let defaultState;

      fetchMock.get(/\/api\/ref\/gender/, [
        { id: 1, value: 'test1' },
        { id: 2, value: 'test2' },
        { id: 3, value: 'test3' }
      ]);

      beforeEach(() => {
        fetchMock.reset();
        genderFilter = wrapper.find('div.filters .gender');
        defaultState = wrapper.state();
      });

      it('should update state on toggle', () => {
        expect(wrapper.find('.filter.element.disabled')).toHaveLength(1);
        expect(!!defaultState.filters).toEqual(true);
        expect(defaultState.filters.gender).toBe(null);

        genderFilter.find('.toggle input').simulate('change');

        expect(wrapper.find('.filter.element.disabled')).toHaveLength(0);
        expect(!!wrapper.state().filters).toEqual(true);
        expect(wrapper.state().filters.gender).toEqual({ active: true });

        genderFilter.find('.toggle input').simulate('change');

        expect(wrapper.find('.filter.element.disabled')).toHaveLength(1);
        expect(!!wrapper.state().filters).toEqual(true);
        expect(wrapper.state().filters.gender).toEqual({ active: false });
      });
    });
  });
});
