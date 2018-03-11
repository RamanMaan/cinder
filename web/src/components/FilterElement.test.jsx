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

    beforeEach(() => {
      wrapper = mount(<FilterElement round />);
    });

    it('should toggle', () => {
      expect(wrapper.find('.filter.element.disabled')).toHaveLength(1);
      expect(wrapper.state('disabled')).toEqual(true);
      wrapper.find('input').simulate('change', { button: 0 });
      expect(wrapper.find('filter.element.disabled')).toHaveLength(0);
      expect(wrapper.state('disabled')).toEqual(false);
    });
  });
});
