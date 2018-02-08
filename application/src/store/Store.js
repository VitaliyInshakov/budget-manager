import { createStore, applyMiddleware, compose } from 'redux';
import reducer from '../reducers/index';
import reduxThunk from 'redux-thunk';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'react-router-redux';

export const history = createBrowserHistory();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middleware = routerMiddleware(history);

const store = createStore(reducer, composeEnhancers(applyMiddleware(reduxThunk, middleware)));

export default store;