import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Authentication from './components/pages/Authentication/Authentication';
import { history } from './store/Store';
import { ConnectedRouter } from 'react-router-redux'

import './assets/style.scss';

class App extends Component {
  render() {
    return (
      <ConnectedRouter history={history}>
        <Route path='/login' component={Authentication} />
      </ConnectedRouter>
    );
  }
}

export default App;
