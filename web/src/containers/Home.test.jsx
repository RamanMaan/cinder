import React from 'react';
import { shallow } from 'enzyme';

import { Home } from './Home';
import MatchesList from '../components/MatchesList';
import Recommendation from './Recommendation';

describe('<Home />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(
      <Home fetchMatch={jest.fn()} clearMatch={jest.fn()} match={{}} />
    );
  });

  it('shows MatchesList and Recommendation components by default', () => {
    expect(wrapper.find(MatchesList)).toHaveLength(1);
    expect(wrapper.find(Recommendation)).toHaveLength(1);
  });
});
