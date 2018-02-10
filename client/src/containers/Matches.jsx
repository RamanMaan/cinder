import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';

import './styles/Matches.css';
import MatchesList from '../components/MatchesList';

class Matches extends Component {
  constructor(props) {
    super(props);

    this.fetchUserMatches = this.fetchUserMatches.bind(this);

    this.state = {
      matches: []
    };
  }

  componentDidMount() {
    this.fetchUserMatches();
  }

  fetchUserMatches() {
    this.setState({ matches: ['A', 'B', 'C', 'D'] });
  }

  render() {
    return (
      <div className="Matches">
        <Container fluid>
          <Row className="full">
            <Col sm="4">
              <MatchesList matches={this.state.matches} />
            </Col>
            <Col sm="8">
              <h1>This is the Matches page</h1>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Matches;
