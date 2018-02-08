import React from 'react';
import { shallow, mount } from 'enzyme';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';
import sinon from 'sinon';

import App from './App';
import Login from './Login';
import SignUp from './Home'; // TODO change from home to redirect page

describe('<Login />', () => {
  it('renders without crashing', () => {
    // simple smoke test
    shallow(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );
  });

  it('renders correctly', () => {
    const component = renderer
      .create(
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      )
      .toJSON();
    expect(component).toMatchSnapshot();
  });

  it('routes correctly', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={['/login']}>
        <App />
      </MemoryRouter>
    );
    expect(wrapper.find(Login)).toHaveLength(1);
  });

  describe('signup button', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={['/login']}>
        <App />
      </MemoryRouter>
    );
    const signUpBtn = wrapper.find('a#signUpBtn').first();

    it('starts on login page', () => {
      expect(wrapper.find(Login)).toHaveLength(1);
      expect(wrapper.find(SignUp)).toHaveLength(0);
    });

    it('redirects to sign up page after click', () => {
      // need {button: 0} when clicking a btn-link
      signUpBtn.simulate('click', { button: 0 });

      expect(wrapper.find(Login)).toHaveLength(0);
      expect(wrapper.find(SignUp)).toHaveLength(1);
    });
  });

  describe('submit login', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={['/login']}>
        <App />
      </MemoryRouter>
    );
    const loginBtn = wrapper.find('button#submitBtn').first();
    const form = wrapper.find('form').first();

    const testFormValues = {
      email: 'foo@email.com',
      password: 'something',
      handleSubmit: jest.fn()
    };

    it('starts on login page', () => {
      expect(wrapper.find(Login)).toHaveLength(1);
      expect(wrapper.find('form.login-form')).toHaveLength(1);
    });

    it('does not submit with empty fields', () => {
      loginBtn.simulate('click');
      expect(wrapper.find(Login)).toHaveLength(1);
    });

    // TODO
    // it('submits with complete fields', () => {
    //   const component = mount(<MemoryRouter><Login {...testFormValues} /></MemoryRouter>);

    //   component.find('input#email').simulate('change', { target: { name: 'email', value: testFormValues.email } });
    //   component.find('input#password').simulate('change', {
    //     target: { name: 'password', value: testFormValues.password },
    //   });
    //   component.find('input#password').simulate('change', {
    //     target: { name: 'password', value: testFormValues.password },
    //   });

    //   component
    //     .find('button#submitBtn')
    //     .first()
    //     .simulate('click');

    //   expect(testFormValues.handleSubmit).toHaveBeenCalledTimes(1);
    // });
  });
});
