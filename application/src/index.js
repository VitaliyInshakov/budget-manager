import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import store from './store/Store'
import App from './App';
import { AUTH_USER, UNAUTH_USER } from './actions/actionTypes';

const token = localStorage.getItem('token');
if(token) {
  store.dispatch({ type: AUTH_USER });
} else {
  store.dispatch({ type: UNAUTH_USER });
}

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider>
      <App />
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('app')
);