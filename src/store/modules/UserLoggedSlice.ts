import { createSlice } from '@reduxjs/toolkit';

const initialState = '';

const userLoggedSlice = createSlice({
  name: 'userLogged',
  initialState,
  reducers: {
    userLogged(state, action) {
      return action.payload;
    },
    logout() {
      return initialState;
    }
  }
});

export const { logout, userLogged } = userLoggedSlice.actions;
export default userLoggedSlice.reducer;
