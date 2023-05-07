import { combineReducers } from '@reduxjs/toolkit';
import userLogged from './UserLoggedSlice';

import errands from './ListErrandsSlice';
import users from './RegisterUserSlice';

export default combineReducers({
  errands,
  users,
  userLogged,
});
