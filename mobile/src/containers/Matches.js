import React from 'react';
import { Container, Content } from 'native-base';

import MatchesList from '../components/MatchesList';

export default class Matches extends React.Component {
  openDetailsPage(match) {
    this.props.navigation.navigate('Details', { ...match });
  }

  render() {
    return (
      <Container>
        <Content>
          <MatchesList openDetails={this.openDetailsPage.bind(this)} />
        </Content>
      </Container>
    );
  }
}
