import {
  AUTH_USER,
  LOGIN_PASSWORD_VISIBLE,
  SIGNUP_VISIBLE,
  SIGNUP_PASSWORD_VISIBLE,
  GET_USERS
} from '../actions/actionTypes';

export default function(state = {}, action) {
  switch(action.type) {
    case AUTH_USER:
      return {...state, authenticated: true}
    case LOGIN_PASSWORD_VISIBLE:{
      const newState = Object.assign({}, state);
      newState.loginPasswordVisible = !newState.loginPasswordVisible;
      return newState;
    }
    case SIGNUP_VISIBLE:
      return {...state, signUpVisible: true}
    case SIGNUP_PASSWORD_VISIBLE:{
      const newState = Object.assign({}, state);
      newState.signUpPasswordVisible = !newState.signUpPasswordVisible;
      return newState;
    }
    case GET_USERS:
      return {...state, users: action.payload}
    default:
      return state;
  }
}