import { createSlice } from '@reduxjs/toolkit';
let nextItemId = 0;
const checkoutSlice = createSlice({
  name: 'checkout',
  // in case cart was saved items, will be here:
  initialState: {
    step: 1,
  },
  // reducers actions
  reducers: {
    //state management
    // create action
    step2(state) {
      state.step = 2;
    },
    step1(state) {
      state.step = 1;
    },
  },
});
export const { step2, step1 } = checkoutSlice.actions;
const { actions, reducer } = checkoutSlice;
export const { checkout } = actions;
export default reducer;
