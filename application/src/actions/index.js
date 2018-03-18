import axios from 'axios';
import {
  AUTH_USER,
  UNAUTH_USER,
  LOGIN_PASSWORD_VISIBLE,
  SIGNUP_VISIBLE,
  SIGNUP_PASSWORD_VISIBLE,
  GET_BUDGETS,
  GET_CLIENTS,
  ADD_ITEM,
  REMOVE_ITEM,
  PARSE_BUDGET,
  CHANGE_SEARCH,
  CHANGE_STATE,
  GET_BUDGETS_BY_STATE,
  GET_BUDGET,
  GET_CLIENT,
  ERROR,
  UPDATE_BUDGET,
  UPDATE_CLIENT,
  SAVE_CLIENT
} from './actionTypes';
import { history } from '../store/Store';

const BudgetManagerAPI = `http://${window.location.hostname}:3001`;

export function authenticate(credentials, redirect) {
  return function(dispatch) {
    axios.post(`${BudgetManagerAPI}/api/v1/auth`, credentials)
      .then((response) => {
        dispatch({ type: AUTH_USER });
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user_id', response.data.user._id);
        if(redirect) history.push(redirect);
      })
      .catch((error) => {
        dispatch(errorHandler(error));
      })
  }
}
export function signup(credentials, redirect) {
  return function(dispatch) {
    axios.post(`${BudgetManagerAPI}/api/v1/signup`, credentials)
      .then(() => {
        axios.post(`${BudgetManagerAPI}/api/v1/auth`, credentials)
        .then((response) => {
          dispatch({ type: AUTH_USER });
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('user_id', response.data.user._id);
          if(redirect) history.push(redirect);
        })
        .catch((error) => {
          dispatch(errorHandler(error));
        })
      })
      .catch((error) => {
        dispatch(errorHandler(error));
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
export function errorHandler(error) {
  const status = error.response.status;
  let message = '';
  if(status === 404) {
    message = 'Invalid request';
  } else if(status === 401 || status === 403) {
    message = 'Unauthorized';
  } else if (status === 400) {
    message = 'Invalid or missing information';
  } else {
    message = error.response.statusText;
  }

  return {
    type: ERROR,
    payload: message
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
    axios.get(`${BudgetManagerAPI}/api/v1/budget`, {
      headers: { 'Authorization': authHeader }
    }).then(({ data }) => {
      dispatch({
        type: GET_BUDGETS,
        payload: dataParser(data, '_id', 'client', 'title', 'state', 'client_id')
      })
    }).catch((error) => {
      dispatch(errorHandler(error));
    });
  }
}
export function getBudget(authHeader, budget) {
  return function(dispatch) {
    axios.get(`${BudgetManagerAPI}/api/v1/budget/single`, {
      headers: { 'Authorization': authHeader },
      params: { user_id: localStorage.getItem('user_id'), _id: budget._id }
    }).then(({ data }) => {
      dispatch({
        type: GET_BUDGET,
        payload: data
      })
    }).catch((error) => {
      dispatch(errorHandler(error));
    });
  }
}
export function saveBudget(authHeader, budget) {
  return function(dispatch) {
    axios.post(`${BudgetManagerAPI}/api/v1/budget`, budget, {
      headers: { 'Authorization': authHeader },
      params: { user_id: localStorage.getItem('user_id') }
    }).then((res) => {
      resetFields(budget);
      dispatch({
        type: ERROR,
        payload: res.data.message
      });
      dispatch(getAllBudgets(authHeader));
    }).catch((error) => {
      dispatch(errorHandler(error));
    });
  }
}
export function saveClient(authHeader, client) {
  return function(dispatch) {
    axios.post(`${BudgetManagerAPI}/api/v1/client`, client, {
      headers: { 'Authorization': authHeader },
      params: { user_id: localStorage.getItem('user_id') }
    }).then((res) => {
      resetFields(client);
      dispatch({
        type: SAVE_CLIENT,
        payload: client
      });
      dispatch({
        type: ERROR,
        payload: res.data.message
      });
      dispatch(getAllClients(authHeader));
    }).catch((error) => {
      dispatch(errorHandler(error));
    });
  }
}
export function fixClientNameAndUpdate(authHeader, budget, clients) {
  clients.find(client => {
    if(client._id === budget.client_id) {
      budget.client = client.name
    }
  });
  return function(dispatch) {
    dispatch(updateBudget(authHeader, budget));
  }
}
export function updateBudget(authHeader, budget) {
  return function(dispatch) {
    axios.put(`${BudgetManagerAPI}/api/v1/budget/single`, budget, {
      headers: { 'Authorization': authHeader },
      params: { user_id: localStorage.getItem('user_id') }
    }).then(() => {
      dispatch({
        type: UPDATE_BUDGET,
        payload: 'Budget updated'
      })
      dispatch(getAllBudgets(authHeader));
    }).catch((error) => {
      dispatch(errorHandler(error));
    });
  }
}
export function updateClient(authHeader, client) {
  return function(dispatch) {
    axios.put(`${BudgetManagerAPI}/api/v1/client/single`, client, {
      headers: { 'Authorization': authHeader },
      params: { user_id: localStorage.getItem('user_id') }
    }).then(() => {
      dispatch({
        type: UPDATE_CLIENT,
        payload: 'Client updated'
      })
      dispatch(getAllClients(authHeader));
    }).catch((error) => {
      dispatch(errorHandler(error));
    });
  }
}
export function resetFields(item) {
  for(let key in item) {
    if(key !== 'total_price') {
      item[key] = '';
      if(key === 'quantity' || key === 'price') {
        item[key] = 0;
      }
      item['items'] = [];
    }
  }
}
export function getClient(authHeader, client) {
  return function(dispatch) {
    axios.get(`${BudgetManagerAPI}/api/v1/client/single`, {
      headers: { 'Authorization': authHeader },
      params: { user_id: localStorage.getItem('user_id'), _id: client._id }
    }).then(({ data }) => {
      dispatch({
        type: GET_CLIENT,
        payload: data
      })
    }).catch((error) => {
      dispatch(errorHandler(error));
    });
  }
}
export function getBudgetsByState(authHeader, state) {
  return function(dispatch) {
    axios.get(`${BudgetManagerAPI}/api/v1/budget/state`, {
      headers: { 'Authorization': authHeader },
      params: { user_id: localStorage.getItem('user_id'), state }
    }).then(({ data }) => {
      dispatch({
        type: GET_BUDGETS_BY_STATE,
        payload: dataParser(data, '_id', 'client', 'title', 'state', 'client_id')
      })
    }).catch((error) => {
      dispatch(errorHandler(error));
    });
  }
}
export function dataParser(targetedArray, ...options) {
  let parsedData = [];
  targetedArray.forEach(item => {
    let parsedItem = {};
    options.forEach(option => (parsedItem[option] = item[option]));
    parsedData.push(parsedItem);
  });
  return parsedData;
}
export function getAllClients(authHeader) {
  return function(dispatch) {
    axios.get(`${BudgetManagerAPI}/api/v1/client`, {
      headers: { 'Authorization': authHeader },
      params: { user_id: localStorage.getItem('user_id') }
    }).then(({ data }) => {
      dispatch({
        type: GET_CLIENTS,
        payload: dataParser(data, 'name', 'email', '_id', 'phone')
      })
    }).catch((error) => {
      dispatch(errorHandler(error));
    });
  }
}
export function addItem() {
  return function(dispatch) {
    const item = {
      title: "",
      quantity: 0,
      price: 0,
      get subtotal() {
        return this.quantity * this.price;
      }
    }

    dispatch({
      type: ADD_ITEM,
      payload: item
    })
  }
}
export function removeItem(selected) {
  return function(dispatch) {
    dispatch({
      type: REMOVE_ITEM,
      payload: selected
    })
  }
}
export function deleteItem(selected, items, api, authHeader) {
  return function(dispatch) {
    let targetApi = '';
    api ? targetApi = 'budget' : targetApi = 'client';
    axios.delete(`${BudgetManagerAPI}/api/v1/${targetApi}`, {
      headers: { 'Authorization': authHeader },
      params: { user_id: localStorage.getItem('user_id'), _id: selected._id }
    }).then(() => {
      items.forEach((item, index) => {
        if (item === selected) {
          items.splice(index, 1)
        }
      });
    }).then(() => {
      api ? dispatch(getAllBudgets(authHeader)) : dispatch(getAllClients(authHeader));
    }).catch((error) => {
      dispatch(errorHandler(error));
    });
  }
}
export function parseBudget(selectedBudget) {
  return function(dispatch) {
    dispatch({
      type: PARSE_BUDGET,
      payload: selectedBudget
    })
  }
}
export function changeSearchField(results) {
  return function(dispatch) {
    dispatch({
      type: CHANGE_SEARCH,
      payload: results
    })
  }
}
export function changeStateField(state) {
  return function(dispatch) {
    dispatch({
      type: CHANGE_STATE,
      payload: state
    })
  }
}