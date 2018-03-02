import React from 'react';
import { StyleSheet } from 'react-native';
import { Container } from 'native-base';

import cinder from '../theme/variables/cinder';
import Recommendations from '../components/Recommendations';

export default class Home extends React.Component {
  render() {
    return (
      <Container>
        <Recommendations />
      </Container>
    );
  }
}
