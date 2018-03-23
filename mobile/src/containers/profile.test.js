import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import mockStore from '../../__tests__/_config/mockStore';

import { Profile } from './profile';


describe('<Profile>', () => {
  const initState = {
    userInfo: {
      userInfo: {
        userName: 'Test Name',
        primaryPic: '',
      },
    },
  };

  const store = mockStore(initState);

  it('renders without crashing', () => {
    fetch.mockResponseSuccess('{"data": []}');

    const rendered = renderer.create(<Provider store={store}><Profile fetchUserInfo={jest.fn()} userInfo={initState.userInfo.userInfo} /></Provider>).toJSON();

    expect(rendered).toMatchSnapshot();
  });

  it('fetchs data on load', () => {
    fetch.mockResponseSuccess('{"data": []}');
    const mockFetch = jest.fn();

    const rendered = renderer.create(<Provider store={store}><Profile fetchUserInfo={mockFetch} userInfo={initState.userInfo.userInfo} /></Provider>).toJSON();

    expect(rendered).toMatchSnapshot();
    expect(mockFetch.mock.calls).toHaveLength(1);
  });
});

