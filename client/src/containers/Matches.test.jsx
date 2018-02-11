import React from 'react';
import { shallow, mount } from 'enzyme';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';
import sinon from 'sinon';

import App from './App';
import Matches from './Matches';
import MatchesList from '../components/MatchesList';
import UserDetail from '../components/UserDetail';

describe('<Matches />', () => {
  it('renders without crashing', () => {
    // simple smoke test
    shallow(
      <MemoryRouter>
        <Matches />
      </MemoryRouter>
    );
  });

  it('renders correctly', () => {
    const component = renderer
      .create(
        <MemoryRouter>
          <Matches />
        </MemoryRouter>
      )
      .toJSON();
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
