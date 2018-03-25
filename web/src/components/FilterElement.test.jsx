import React from 'react';
import { mount } from 'enzyme';
import renderer from 'react-test-renderer';

import FilterElement from './FilterElement';

describe('<FilterElement />', () => {
  describe('Snapshot tests', () => {
    it('should render with no children - disabled by default', () => {
      const component = renderer.create(<FilterElement />);
      expect(component).toMatchSnapshot();
    });

    it('should render with children', () => {
      const component = renderer.create(
        <FilterElement>
          <span>Some content here</span>
        </FilterElement>
      );
      expect(component).toMatchSnapshot();
    });

    it('should render round if round', () => {
      const component = renderer.create(<FilterElement round />);
      expect(component).toMatchSnapshot();
    });

    it('should render not disabled if checked', () => {
      const component = renderer.create(<FilterElement checked />);
      expect(component).toMatchSnapshot();
    });
  });

  describe('Enzyme tests', () => {
    let wrapper;
    let mockActiveChange;

    beforeEach(() => {
      mockActiveChange = jest.fn();
      wrapper = mount(<FilterElement round onChange={mockActiveChange} />);
    });

    it('should toggle', () => {
      expect(mockActiveChange.mock.calls).toHaveLength(0);
      wrapper.find('input').simulate('change');
      expect(mockActiveChange.mock.calls).toHaveLength(1);
    });

    it('should trigger onChange on toggle', () => {
      expect(mockActiveChange.mock.calls).toHaveLength(0);
      wrapper.find('input').simulate('change');

      expect(mockActiveChange.mock.calls).toHaveLength(1);
      wrapper.find('input').simulate('change');

      expect(mockActiveChange.mock.calls).toHaveLength(2);
      wrapper.find('input').simulate('change');

      expect(mockActiveChange.mock.calls).toHaveLength(3);
      wrapper.find('input').simulate('change');
    });
  });
});
