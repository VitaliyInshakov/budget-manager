import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as form } from 'redux-form';
import authReducer from './authReducer';

const reducer = combineReducers({
  form,
  router: routerReducer,
  auth: authReducer
})

export default reducer;