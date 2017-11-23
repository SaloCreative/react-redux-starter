import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import test from './test';
import users from './users';

const rootReducer = combineReducers({
  test,
  users,
  routing: routerReducer
});

export default rootReducer;