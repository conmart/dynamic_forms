import React, { Component } from 'react';
import './App.css';

import { data } from './exampleData';
import Form from './Form';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formResults: '',
    };
  }

  setFormResults = (formResults) => {
    this.setState({ formResults });
  };

  render() {
    const { formResults } = this.state;
    return (
      <div className="App">
        <h1>Dynamic Forms</h1>
        <Form data={data} saveResults={this.setFormResults} />

        <div className="results">{formResults}</div>
      </div>
    );
  }
}

export default App;
