import { GET_BUDGETS } from '../actions/actionTypes';

export default function(state = {}, action) {
  switch(action.type) {
    case GET_BUDGETS:
      return {...state, budgets: action.payload}
    default:
      return state;
  }
}