import React, { Component } from 'react';
import Layout from './components/Layout/Layout';

class App extends Component {
  render() {
    return (
      <div>
        { /* This can be the root component but I kept App as the root component in case layout changes and I need
        to change something at the root level. */}
        <Layout></Layout>
      </div>
    );
  }
}

export default App;
