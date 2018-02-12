import axios from 'axios';
import { AUTH_USER, AUTH_ERROR, TOGGLE_VISIBLE, SIGNUP_FORM } from './actionTypes';
import { history } from '../store/Store';

const BudgetManagetAPI = `http://${window.location.hostname}:3001`;

export function authenticate(credentials, redirect) {
  return function(dispatch) {
    axios.post(`${BudgetManagetAPI}/api/v1/auth`, credentials)
      .then(({ data: { token } }) => {
        dispatch({ type: AUTH_USER });
        localStorage.setItem('token', token);
        if(redirect) history.push(redirect);
      })
      .catch(({ response: { data } }) => {
        dispatch(authError(data.message));
      })
  }
}

export function signup(credentials, redirect) {
  return function(dispatch) {
    axios.post(`${BudgetManagetAPI}/api/v1/signup`, credentials)
      .then(({ data: { token } }) => {
        dispatch({ type: AUTH_USER });
        localStorage.setItem('token', token);
        if(redirect) history.push(redirect);
      })
      .catch(({ response: { data } }) => {
        dispatch(authError(data.message));
      })
  }
}

export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error
  }
}

export function changeVisibility() {
  return function(dispatch) {
    dispatch({ type: TOGGLE_VISIBLE });
  }
}

export function changeSignUpVisible() {
  return function(dispatch) {
    dispatch({ type: SIGNUP_FORM })
  }
}