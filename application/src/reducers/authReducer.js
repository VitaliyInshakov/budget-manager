import { AUTH_USER, TOGGLE_VISIBLE, SIGNUP_FORM } from '../actions/actionTypes';

export default function(state = {}, action) {
  switch(action.type) {
    case AUTH_USER:
      return {...state, authenticated: true}
    case TOGGLE_VISIBLE:
      const newState = Object.assign({}, state);
      newState.loginPasswordVisible = !newState.loginPasswordVisible;
      return newState;
    case SIGNUP_FORM:
      return {...state, signUpVisible: true}
    default:
      return state;
  }
}