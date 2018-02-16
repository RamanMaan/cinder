import React from 'react';
import { shallow, mount } from 'enzyme';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';
import fetchMock from 'fetch-mock';

import App from './App';
import Recommendation from './Recommendation';

describe('<Recommendation />', () => {
  const testPotentialMatches = [
    {
      userName: 'Some Name 1',
      userID: 1,
      age: 21,
      matchDate: '2018-02-03T18:09:05.000Z',
      primaryPic: null
    },
    {
      userName: 'Some Name 2',
      userID: 5,
      age: 22,
      matchDate: '2018-01-03T18:09:05.000Z',
      primaryPic: 'http://c.min.ms/m/b/13/13022/e8250eba.jpeg'
    },
    {
      userName: 'Some Name 3',
      userID: 3,
      age: 23,
      matchDate: '2018-02-06T18:09:05.000Z',
      primaryPic: null
    },
    {
      userName: 'Some Name 4',
      userID: 2,
      age: 24,
      matchDate: '2018-02-04T18:09:05.000Z',
      primaryPic: 'http://c.min.ms/m/b/13/13022/e8250eba.jpeg'
    }
  ];

  beforeEach(() => {
    fetchMock.reset();
    fetchMock.restore();
    fetchMock.get(/\/api\/users\/[0-9]*\/matches/, []);
    fetchMock.get(/\/api\/users\/[0-9]*\/recommendations/, testPotentialMatches);
  });

  afterAll(() => {
    fetchMock.reset();
    fetchMock.restore();
  });

  it('renders without crashing', () => {
    // simple smoke test
    shallow(<Recommendation />);
    mount(<Recommendation />);
  });

  it('should show the <Recommendation /> component by default', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={['']}>
        <App />
      </MemoryRouter>
    );

    expect(wrapper.find(Recommendation)).toHaveLength(1);
  });

  it('renders with empty props correctly', () => {
    const component = renderer.create(<Recommendation />).toJSON();
    expect(component).toMatchSnapshot();
  });
});
