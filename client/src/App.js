import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  state = {
    server_response: ''
  };

  getMessage = () => {
    return fetch('/api/user/example')
      .then(res => res.json())
      .catch(err => console.error(err));
  };

  componentDidMount() {
    this.getMessage()
      .then(msg => this.setState({ server_response: msg.example }))
      .catch(err => console.error(err));
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">{this.state.server_response}</p>
      </div>
    );
  }
}

export default App;
