import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';
// import sinon from 'sinon';
// import fetchMock from 'fetch-mock';

import { Login } from './Login';
// import App from './App';
// import Signup from './Signup';

describe('<Login />', () => {
  it('renders without crashing', () => {
    // simple smoke test
    shallow(
      <MemoryRouter>
        <Login loginUser={jest.fn()} message={''} isAuthenticated={false} />
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

  /* I think it's better to check routes in integration test
   * And.. App is now connected to redux store so creates
   * errors when trying to mount without importing store
   */

  // it('routes correctly', () => {
  //   const wrapper = mount(
  //     <MemoryRouter initialEntries={['/login']}>
  //       <App />
  //     </MemoryRouter>
  //   );
  //   expect(wrapper.find(Login)).toHaveLength(1);
  // });

  // describe('signup button', () => {
  //   const wrapper = mount(
  //     <MemoryRouter initialEntries={['/login']}>
  //       <App />
  //     </MemoryRouter>
  //   );
  //   const signUpBtn = wrapper.find('a#signUpBtn').first();

  //   it('starts on login page', () => {
  //     expect(wrapper.find(Login)).toHaveLength(1);
  //     expect(wrapper.find(Signup)).toHaveLength(0);
  //   });

  //   it('redirects to sign up page after click', () => {
  //     // need {button: 0} when clicking a btn-link
  //     signUpBtn.simulate('click', { button: 0 });

  //     expect(wrapper.find(Login)).toHaveLength(0);
  //     expect(wrapper.find(Signup)).toHaveLength(1);
  //   });
  // });

  describe('Form value', () => {
    let wrapper;
    const mockLogin = jest.fn();

    beforeEach(() => {
      wrapper = shallow(<Login loginUser={mockLogin} />);
      mockLogin.mockClear();
    });

    it('starts the form with placeholder fields', () => {
      expect(wrapper.find('.login-form')).toHaveLength(1);
      expect(wrapper.find('#email').prop('placeholder')).toBe('Email');
      expect(wrapper.find('#password').prop('placeholder')).toBe('Password');
    });

    it('changes the form value accordingly to input', () => {
      const testEmail = 'foo@email.com';
      const testPassword = 'somesecretpassword';

      wrapper.find('#email').simulate('change', {
        target: { name: 'email', value: testEmail }
      });

      wrapper.find('#password').simulate('change', {
        target: { name: 'password', value: testPassword }
      });

      expect(wrapper.state().email).toBe(testEmail);
      expect(wrapper.state().password).toBe(testPassword);
    });
  });

  describe('Submit login', () => {
    let wrapper;
    const mockLogin = jest.fn();

    beforeEach(() => {
      wrapper = shallow(<Login loginUser={mockLogin} />);
      mockLogin.mockClear();
    });

    it('calls the mock function when form is submitted', () => {
      wrapper.find('.login-form').simulate('submit', { preventDefault() {} });
      expect(mockLogin.mock.calls.length).toBe(1);
    });

    it('does not submit with empty fields', () => {
      wrapper.find('#submitBtn').simulate('click');
      expect(wrapper.find('.Login')).toHaveLength(1);
      expect(mockLogin).toHaveBeenCalledTimes(0);
    });

    it('submits with complete fields', () => {
      const testEmail = 'completeFileds@email.com';
      const testPassword = 'completePassword';
      wrapper.find('#email').simulate('change', {
        target: { name: 'email', value: testEmail }
      });
      wrapper.find('#password').simulate('change', {
        target: { name: 'password', value: testPassword }
      });

      wrapper.find('.login-form').simulate('submit', { preventDefault() {} });
      expect(mockLogin.mock.calls.length).toBe(1);
      expect(mockLogin.mock.calls[0][0].email).toBe(testEmail);
      expect(mockLogin.mock.calls[0][0].password).toBe(testPassword);
    });
  });
});
