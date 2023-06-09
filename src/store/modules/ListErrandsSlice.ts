import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../../store/index';
import { Errand } from './registerUserSlice';


const adapter = createEntityAdapter<Errand>({
  selectId: item => item.errandId
});

export const { selectAll, selectById } = adapter.getSelectors((state: RootState) => state.errands);

const listErrandsSlice = createSlice({
  name: 'errands',
  initialState: adapter.getInitialState(),
  reducers: {
    addErrand: adapter.addOne,
    updateErrands: adapter.updateOne,
    removeErrands: adapter.removeOne,
    addAllErrands: adapter.setAll
  }
});

export const { addErrand, updateErrands, removeErrands, addAllErrands } = listErrandsSlice.actions;
export default listErrandsSlice.reducer;
