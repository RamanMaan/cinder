import React from 'react';
import { shallow, mount } from 'enzyme';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';
import sinon from 'sinon';
import fetchMock from 'fetch-mock';

import App from './App';
import Matches from './Matches';
import MatchesList from '../components/MatchesList';
import UserDetail from '../components/UserDetail';

describe('<Matches />', () => {
  const testMatches = [
    {
      userName: 'Some Name 1',
      userID: 1,
      matchDate: '2018-02-03T18:09:05.000Z',
      primaryPic: null
    },
    {
      userName: 'Some Name 2',
      userID: 5,
      matchDate: '2018-01-03T18:09:05.000Z',
      primaryPic: 'http://c.min.ms/m/b/13/13022/e8250eba.jpeg'
    },
    {
      userName: 'Some Name 3',
      userID: 3,
      matchDate: '2018-02-06T18:09:05.000Z',
      primaryPic: null
    },
    {
      userName: 'Some Name 4',
      userID: 2,
      matchDate: '2018-02-04T18:09:05.000Z',
      primaryPic: 'http://c.min.ms/m/b/13/13022/e8250eba.jpeg'
    }
  ];

  beforeEach(() => {
    fetchMock.reset();
    fetchMock.restore();
    fetchMock.get(/\/api\/users\/[0-9]*\/matches/, testMatches);
  });

  afterAll(() => {
    fetchMock.reset();
    fetchMock.restore();
  });

  it('renders without crashing', () => {
    // simple smoke test
    shallow(<Matches />);
    mount(<Matches />);
  });

  it('renders correctly', () => {
    const component = renderer.create(<Matches />).toJSON();

    expect(component).toMatchSnapshot();
  });

  it('routes correctly', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={['/matches']}>
        <App />
      </MemoryRouter>
    );
    expect(wrapper.find(Matches)).toHaveLength(1);
  });

  it('should show the <MatchesList /> component be default', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={['/matches']}>
        <App />
      </MemoryRouter>
    );
    expect(wrapper.find(MatchesList)).toHaveLength(1);
  });

  it('should show the <UserDetail /> component be default', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={['/matches']}>
        <App />
      </MemoryRouter>
    );
    wrapper.setState({ userDetail: false });

    expect(wrapper.find(UserDetail)).toHaveLength(1);
  });
});
