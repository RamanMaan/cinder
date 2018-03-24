import React from 'react';
import renderer from 'react-test-renderer';

import { FilterModal } from './FilterModal';


describe('<FilterModal>', () => {
  it('renders without crashing', () => {
    const rendered = renderer.create(<FilterModal fetchData={jest.fn()} onSelectChange={jest.fn()} />).toJSON();

    expect(rendered).toMatchSnapshot();
  });

  it('fetchs data on load', () => {
    const mockFetch = jest.fn();
    const rendered = renderer.create(<FilterModal type="test" fetchData={mockFetch} onSelectChange={jest.fn()} />).toJSON();

    expect(rendered).toMatchSnapshot();
    expect(mockFetch.mock.calls).toHaveLength(1);
  });

  it('loads items', () => {
    const testData = { ref: [{ id: 1, value: 'x' }, { id: 2, value: 'y' }] };
    const rendered = renderer.create(<FilterModal type="test" fetchData={jest.fn()} onSelectChange={jest.fn()} refData={testData} />).toJSON();

    expect(rendered).toMatchSnapshot();
  });
});

