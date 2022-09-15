import { createSlice } from '@reduxjs/toolkit';
// import { cakeActions } from '../cake/cakeSlice';

const initialState = {
  numOfIcecream: 20,
};

const icecreamSlice = createSlice({
  name: 'icecream',
  initialState,
  reducers: {
    ordered: (state) => {
      state.numOfIcecream--;
    },
    restocked: (state, action) => {
      state.numOfIcecream += action.payload;
    },
  },
  // extraReducers: (builder) => {
  //   builder.addCase(cakeActions.ordered, (state) => {
  //     state.numOfIcecream--;
  //   });
  // },
});

const icecreamActions = icecreamSlice.actions;
const icecreamReducer = icecreamSlice.reducer;

export { icecreamReducer as default, icecreamActions };
