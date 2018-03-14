import {
  GET_BUDGETS,
  GET_CLIENTS,
  TOGGLE_VISIBLE_DATA,
  ACTIVE_FAB,
  CHANGE_SEARCH,
  CHANGE_STATE,
  GET_BUDGETS_BY_STATE,
  SHOW_ADD_NEW_BUDGET,
  SHOW_ADD_NEW_CLIENT,
  SHOW_LIST_BUDGETS,
  SHOW_LIST_CLIENTS,
  GET_BUDGET,
  GET_CLIENT,
  ERROR,
  UPDATE_BUDGET,
  UPDATE_CLIENT
} from '../actions/actionTypes';

const initialState = {
  parsedBudgets: null,
  budget: null,
  client: null,
  stateField: null,
  budgets: [],
  clients: [],
  budgetsVisible: true,
  message: '',
  fab: false,
  listPage: true,
  createPage: false,
  editPage: false,
  budgetCreation: true,
  budgetEdit: true
}

export default function(state = initialState, action) {
  switch(action.type) {
    case GET_BUDGETS:
      return {...state, budgets: action.payload}
    case GET_BUDGETS_BY_STATE:
      return {...state, budgets: action.payload}
    case GET_BUDGET:
      return {...state, budget: action.payload, listPage: false, budgetEdit: true, budgetCreation: false, editPage: true }
    case GET_CLIENTS:
      return {...state, clients: action.payload}
    case GET_CLIENT:
      return {...state, client: action.payload, listPage: false, budgetEdit: false, budgetCreation: false, editPage: true, createPage: true }
    case ERROR:
      return {...state, message: action.payload}
    case TOGGLE_VISIBLE_DATA:{
      const newState = Object.assign({}, state);
      newState.budgetsVisible = !newState.budgetsVisible;
      return newState;
    }
    case ACTIVE_FAB:{
      const newState = Object.assign({}, state);
      newState.fab = !newState.fab;
      return newState;
    }
    case CHANGE_SEARCH:
      return {...state, parsedBudgets: action.payload}
    case CHANGE_STATE:
      return {...state, stateField: action.payload}
    case SHOW_ADD_NEW_BUDGET:
      return {...state, budgetCreation: true, listPage: false, editPage: false, createPage: true, budgetsVisible: true }
    case SHOW_ADD_NEW_CLIENT:
      return {...state, budgetCreation: false, listPage: false, editPage: false, createPage: true, budgetsVisible: false }
    case SHOW_LIST_BUDGETS:
      return {...state, budgetCreation: false, listPage: true, budgetsVisible: true, createPage: false }  
    case SHOW_LIST_CLIENTS:
      return {...state, budgetCreation: false, listPage: true, budgetsVisible: false, createPage: false } 
    case UPDATE_BUDGET:
      return {...state, budgetCreation: false, listPage: true, budgetsVisible: true, createPage: false }
    case UPDATE_CLIENT:
      return {...state, budgetCreation: false, listPage: true, budgetsVisible: false, createPage: false  }
    default:
      return state;
  }
}