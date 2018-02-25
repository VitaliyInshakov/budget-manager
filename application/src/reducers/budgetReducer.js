import { GET_BUDGETS, GET_CLIENTS, TOGGLE_VISIBLE_DATA } from '../actions/actionTypes';

export default function(state = {}, action) {
  switch(action.type) {
    case GET_BUDGETS:
      return {...state, budgets: action.payload}
    case GET_CLIENTS:
      return {...state, clients: action.payload}
    case TOGGLE_VISIBLE_DATA:
      const newState = Object.assign({}, state);
      newState.budgetsVisible = !newState.budgetsVisible;
      return newState;
    default:
      return state;
  }
}