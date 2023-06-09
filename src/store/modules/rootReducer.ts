import { combineReducers } from '@reduxjs/toolkit';
import users from './registerUserSlice';

import errands from './ListErrandsSlice';
import userLogged from './UserLoggedSlice';

export default combineReducers({
  errands,
  userLogged,
  users,

});
