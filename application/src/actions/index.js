import axios from 'axios';
import {
  AUTH_USER,
  AUTH_ERROR,
  UNAUTH_USER,
  LOGIN_PASSWORD_VISIBLE,
  SIGNUP_VISIBLE,
  SIGNUP_PASSWORD_VISIBLE,
  GET_USERS
} from './actionTypes';
import { history } from '../store/Store';

const BudgetManagetAPI = `http://${window.location.hostname}:3001`;

export function authenticate(credentials, redirect) {
  return function(dispatch) {
    axios.post(`${BudgetManagetAPI}/api/v1/auth`, credentials)
      .then((response) => {
        dispatch({ type: AUTH_USER });
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user_id', response.data.user._id);
        if(redirect) history.push(redirect);
      })
      .catch((response) => {
        dispatch(authError(response.data.message));
      })
  }
}

export function signup(credentials, redirect) {
  return function(dispatch) {
    axios.post(`${BudgetManagetAPI}/api/v1/signup`, credentials)
      .then(() => {
        authenticate(credentials, redirect);
      })
      .catch((response) => {
        dispatch(authError(response.data.message));
      })
  }
}

export function signout(redirect) {
  localStorage.removeItem('token');
  localStorage.removeItem('user_id');
  return { type: UNAUTH_USER }
  if(redirect) history.push(redirect);
}

export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error
  }
}

export function changeloginPasswordVisible() {
  return function(dispatch) {
    dispatch({ type: LOGIN_PASSWORD_VISIBLE });
  }
}

export function changesignUpPasswordVisible () {
  return function(dispatch) {
    dispatch({ type: SIGNUP_PASSWORD_VISIBLE });
  }
}

export function changeSignUpVisible() {
  return function(dispatch) {
    dispatch({ type: SIGNUP_VISIBLE })
  }
}

export function getAllUsers(authHeader) {
  return function(dispatch) {
    axios.get(`${BudgetManagetAPI}/api/v1/users`, {
      headers: {
        'Authorization': authHeader
      }
    }).then(({ data }) => {
      dispatch({
        type: GET_USERS,
        payload: data
      })
    });
  }
}