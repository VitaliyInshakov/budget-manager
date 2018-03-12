import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as form } from 'redux-form';
import authReducer from './authReducer';
import budgetReducer from './budgetReducer';
import homeReducer from './homeReducer';

const reducer = combineReducers({
  form,
  router: routerReducer,
  auth: authReducer,
  budget: budgetReducer,
  home: homeReducer
})

export default reducer;