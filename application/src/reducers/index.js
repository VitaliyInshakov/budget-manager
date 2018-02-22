import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as form } from 'redux-form';
import authReducer from './authReducer';
import budgetReducer from './budgetReducer';

const reducer = combineReducers({
  form,
  router: routerReducer,
  auth: authReducer,
  budget: budgetReducer
})

export default reducer;