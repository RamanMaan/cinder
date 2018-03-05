import React from 'react';
import { Container, Content } from 'native-base';

import MatchesList from '../components/MatchesList'

export default class Matches extends React.Component {
  render() {
    return (
      <Container>
        <Content>
          <MatchesList />
        </Content>
      </Container>
    );
  }
}
