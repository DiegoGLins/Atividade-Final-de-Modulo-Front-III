import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import UserRegisterType from '../../types/UserRegisterType';

export interface UserState {
  items: UserRegisterType[];
  loggedUser: UserRegisterType;
}

const initialState: UserState = {
  items: [],
  loggedUser: {
    email: '',
    password: '',
    errands: []
  }
};

const registerUserSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    register: (state:UserState, action: PayloadAction<UserRegisterType>) => {
      const userAlreadyExist = state.items.find(users => users.email === action.payload.email);
      if (userAlreadyExist) {
        alert('Usuário já cadastro');
      } else {
        state.items.push(action.payload);
      }
    },
    login: (state: UserState, action: PayloadAction<UserRegisterType>) => {
      state.loggedUser = action.payload;
    }
  }
});

export const { register, login } = registerUserSlice.actions;
export default registerUserSlice.reducer;
