import axios from 'axios';
import { AUTH_USER } from './actionTypes';

const BudgetManagetAPI = `http://${window.location.hostname}:3001`;

export function authenticate(context, credentials, redirect) {
  return function(dispatch) {
    axios.post(`${BudgetManagetAPI}/api/v1/auth`, credentials)
      .then()
      .catch()
  }
}