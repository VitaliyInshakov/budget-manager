import { AUTH_USER, TOGGLE_VISIBLE } from '../actions/actionTypes';

export default function(state = {}, action) {
  switch(action.type) {
    case AUTH_USER:
      return {...state, authenticated: true }
    case TOGGLE_VISIBLE:
      const newState = Object.assign({}, state);
      newState.toggleVisibility = !newState.toggleVisibility;
      return newState;
  }
  return state;
}