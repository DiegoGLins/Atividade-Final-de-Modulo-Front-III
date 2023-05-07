import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import UserRegisterType from '../../types/UserRegisterType';
import ErrandsType from '../../types/ErrandsType';

const initialState: UserRegisterType = {
  email: '',
  password: '',
  errands: []
};

const userLoggedSlice = createSlice({
  name: 'userLogged',
  initialState,
  reducers: {
    loggeds: (_, action: PayloadAction<UserRegisterType>) => {
      return action.payload;
    },
    add: (state, action: PayloadAction<ErrandsType>) => {
      state.errands.push(action.payload);
    },
    logout() {
      return initialState;
    }
  }
});

export const {logout, loggeds, add } = userLoggedSlice.actions;
export default userLoggedSlice.reducer;
