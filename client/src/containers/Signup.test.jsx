import React from 'react';
import { shallow, mount } from 'enzyme';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';
import sinon from 'sinon';

import App from './App';
import Login from './Login';
import Signup from './Signup';

describe('<Signup />', () => {
  it('renders without crashing', () => {
    // simple smoke test
    shallow(
      <MemoryRouter>
        <Signup />
      </MemoryRouter>
    );
  });

  it('renders correctly', () => {
    const component = renderer
      .create(
        <MemoryRouter>
          <Signup />
        </MemoryRouter>
      )
      .toJSON();
    expect(component).toMatchSnapshot();
  });

  it('routes correctly', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={['/signup']}>
        <App />
      </MemoryRouter>
    );
    expect(wrapper.find(Signup)).toHaveLength(1);
  });

  describe('back to log in button', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={['/signup']}>
        <App />
      </MemoryRouter>
    );
    const logInBtn = wrapper.find('a#login').first();

    it('starts on signup page', () => {
      expect(wrapper.find(Signup)).toHaveLength(1);
      expect(wrapper.find(Login)).toHaveLength(0);
    });

    it('redirects to login page after click', () => {
      // need {button: 0} when clicking a btn-link
      logInBtn.simulate('click', { button: 0 });

      expect(wrapper.find(Signup)).toHaveLength(0);
      expect(wrapper.find(Login)).toHaveLength(1);
    });
  });
});
