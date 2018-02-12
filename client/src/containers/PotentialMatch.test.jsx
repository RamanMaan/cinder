import React from 'react';
import { shallow, mount } from 'enzyme';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';
import sinon from 'sinon';

import App from './App';
import PotentialMatch from './PotentialMatch';
import PotentialMatchDetail from '../components/PotentialMatchDetail';

// describe('<PotentialMatch />', () => {
//   it('renders without crashing', () => {
//     // simple smoke test
//     shallow(
//       <MemoryRouter>
//         <PotentialMatch />
//       </MemoryRouter>
//     );
//   });

//   it('renders correctly', () => {
//     const component = renderer
//       .create(
//         <MemoryRouter>
//           <PotentialMatch />
//         </MemoryRouter>
//       )
//       .toJSON();
//     expect(component).toMatchSnapshot();
//   });

//   it('routes correctly', () => {
//     const wrapper = mount(
//       <MemoryRouter initialEntries={['/']}>
//         <App />
//       </MemoryRouter>
//     );
//     expect(wrapper.find(PotentialMatch)).toHaveLength(1);
//   });

//   it('should show the <MatchesList /> component be default', () => {
//     const wrapper = mount(
//       <MemoryRouter initialEntries={['/']}>
//         <App />
//       </MemoryRouter>
//     );
//     expect(wrapper.find(PotentialMatchDetail)).toHaveLength(1);
//   });
// });
