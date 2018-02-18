import {
  AUTH_USER,
  AUTH_ERROR,
  LOGIN_PASSWORD_VISIBLE,
  SIGNUP_VISIBLE,
  SIGNUP_PASSWORD_VISIBLE,
  GET_USERS,
  UNAUTH_USER
} from '../actions/actionTypes';

export default function(state = {}, action) {
  switch(action.type) {
    case AUTH_USER:
      return {...state, error: '', authenticated: true}
    case AUTH_ERROR:
      return{...state, error: action.payload}
    case UNAUTH_USER:
      return {...state, authenticated: false}
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