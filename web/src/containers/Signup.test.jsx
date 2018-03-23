import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';
import Signup from './Signup';

describe('<Signup />', () => {
  let wrapper;
  beforeAll(() => {
    wrapper = shallow(<Signup />);
  });

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

  describe('Form value', () => {
    let testValues;

    beforeEach(() => {
      wrapper = shallow(<Signup />);
      testValues = {
        email: 'foo@email.com',
        emailConfirm: 'foo@email.com',
        password: 'something',
        passwordConfirm: 'something',
        userName: 'foo',
        birthday: '1990-01-02',
        gender: '0',
        handleSubmit: jest.fn()
      };
    });

    it('changes the form value accordingly to input', () => {
      wrapper.find('#email').simulate('change', {
        target: { name: 'email', value: testValues.email }
      });

      expect(wrapper.state().email).toBe(testValues.email);
    });
  });

  describe('Submit sign up', () => {
    const mockSignup = jest.fn();
    let testValues;

    beforeEach(() => {
      wrapper.instance().userSignup = mockSignup;
      wrapper.update();
      mockSignup.mockClear();

      testValues = {
        email: 'foo@email.com',
        emailConfirm: 'foo@email.com',
        password: 'something',
        passwordConfirm: 'something',
        userName: 'foo',
        birthday: '1990-01-02',
        gender: 'Male',
        handleSubmit: jest.fn()
      };
    });

    it('calls the mock function when form is submitted', () => {
      wrapper.find('.signup-form').simulate('submit', { preventDefault() {} });
      expect(mockSignup.mock.calls.length).toBe(1);
    });

    it('does not submit with empty fields', () => {
      wrapper.find('#submitBtn').simulate('click');
      expect(wrapper.find('.Signup')).toHaveLength(1);
      expect(mockSignup).toHaveBeenCalledTimes(0);
    });

    // TODO
    // it('submits with complete fields', () => {
    // });
  });
});
