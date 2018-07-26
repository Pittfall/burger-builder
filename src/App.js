import React, { Component } from 'react';
import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';

class App extends Component {
  render() {
    return (
      <div>
        { /* This can be the root component but I kept App as the root component in case layout changes and I need
        to change something at the root level. */}
        <Layout><BurgerBuilder /></Layout>
      </div>
    );
  }
}

export default App;
