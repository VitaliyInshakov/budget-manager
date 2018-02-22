import axios from 'axios';
import {
  AUTH_USER,
  AUTH_ERROR,
  UNAUTH_USER,
  LOGIN_PASSWORD_VISIBLE,
  SIGNUP_VISIBLE,
  SIGNUP_PASSWORD_VISIBLE,
  GET_BUDGETS
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
      })
      .catch((response) => {
        dispatch(authError(response.data.message));
      })
  }
}

export function signout(redirect) {
  return function(dispatch) {
    localStorage.removeItem('token');
    localStorage.removeItem('user_id');
    dispatch({ type: UNAUTH_USER });
    if(redirect) history.push(redirect);
  }
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

export function getAllBudgets(authHeader) {
  return function(dispatch) {
    axios.get(`${BudgetManagetAPI}/api/v1/budget`, {
      headers: { 'Authorization': authHeader },
      params: { user_id: localStorage.getItem('user_id') }
    }).then(({ data }) => {
      dispatch({
        type: GET_BUDGETS,
        payload: data
      })
    });
  }
}