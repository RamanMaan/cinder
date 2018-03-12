import React from 'react';
import { mount, shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import fetchMock from 'fetch-mock';

import Dropdown from './Dropdown';

describe('<Dropdown />', () => {
  fetchMock.get(/\/[a-z]*/, [
    { id: 1, value: 'something' },
    { id: 2, value: 'test' },
    { id: 3, value: 'else' }
  ]);

  describe('Snapshot tests', () => {
    it('should render', () => {
      const component = renderer.create(<Dropdown endpoint="/test" />);
      expect(component).toMatchSnapshot();
    });
  });

  describe('Enzyme tests', () => {
    let wrapper;
    let mockActiveChange;

    beforeEach(() => {
      mockActiveChange = jest.fn();
      fetchMock.reset();
      wrapper = shallow(
        <Dropdown endpoint="/api/ref/test" onChange={mockActiveChange} />
      );
    });

    it('should run fetch mock data', () => {
      expect(fetchMock.calls).toHaveLength(1);
    });

    it('should call parent change on change', () => {
      expect(mockActiveChange.mock.calls).toHaveLength(0);
      wrapper.find('Async').simulate('change');
      expect(mockActiveChange.mock.calls).toHaveLength(1);
    });
  });
});
