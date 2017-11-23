import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import test from './test';
import users from './users';
import photos from './photos';

const rootReducer = combineReducers({
  test,
  users,
  photos,
  routing: routerReducer
});

export default rootReducer;