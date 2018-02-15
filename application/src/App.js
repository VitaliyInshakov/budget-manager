import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Authentication from './components/pages/Authentication/Authentication';
import Home from './components/pages/Home';
import RequireAuth from './components/requireAuth';
import { history } from './store/Store';
import { ConnectedRouter } from 'react-router-redux'

import './assets/style.scss';

class App extends Component {
  render() {
    return (
      <ConnectedRouter history={history}>
        <div>
          <Route exact path='/' component={RequireAuth(Home)} />
          <Route path='/login' component={Authentication} />
        </div>
      </ConnectedRouter>
    );
  }
}

export default App;
