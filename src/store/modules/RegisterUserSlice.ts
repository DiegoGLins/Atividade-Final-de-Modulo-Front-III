import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import UserRegisterType from '../../types/UserRegisterType';
import ErrandsType from '../../types/ErrandsType';

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
    },
    add: (state, action: PayloadAction<ErrandsType>) => {
      state.loggedUser.errands.push(action.payload);
    },
  }
});

export const { register, login, add } = registerUserSlice.actions;
export default registerUserSlice.reducer;
