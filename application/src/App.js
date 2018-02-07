import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Authentication from './components/pages/Authentication/Authentication';

import './assets/style.scss';

class App extends Component {
  render() {
    return (
      <Router>
        <Route path='/login' component={Authentication} />
      </Router>
    );
  }
}

export default App;
