import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import type { RootState } from '..';
import ErrandsType from '../../types/ErrandsType';

const adapter = createEntityAdapter<ErrandsType>({
  selectId: item => item.errandsId
});

export const { selectAll, selectById, selectTotal } = adapter.getSelectors((state: RootState) => state.errands);

const listErrandsSlice = createSlice({
  name: 'errands',
  initialState: adapter.getInitialState(),
  reducers: {
    addErrands: adapter.addOne,
    updateErrands: adapter.updateOne,
    removeErrands: adapter.removeOne
  }
});

export const { addErrands, updateErrands, removeErrands } = listErrandsSlice.actions;
export default listErrandsSlice.reducer;
