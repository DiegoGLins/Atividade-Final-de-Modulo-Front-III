import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../..';

export interface Errand {
  errandId: string;
  description: string;
  details: string
}

export interface User {
  email: string;
  password: string;
  errands: Errand[];
}

const adapter = createEntityAdapter<User>({
  selectId: user => user.email
});

export const { selectAll, selectById } = adapter.getSelectors((state:RootState) => state.users);

const registerUserSlice = createSlice({
  name: 'users',
  initialState: adapter.getInitialState(),
  reducers: {
    saveUser: adapter.addOne,
    updateUser: adapter.updateOne
  }
});

export const { saveUser, updateUser } = registerUserSlice.actions;
export default registerUserSlice.reducer;
