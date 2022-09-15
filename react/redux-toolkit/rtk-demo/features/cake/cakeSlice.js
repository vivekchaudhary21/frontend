import pkg from '@reduxjs/toolkit';

const { createSlice } = pkg;

const initialState = {
  numOfCakes: 10,
};

const cakeSlice = createSlice({
  name: 'cake',
  initialState,
  reducers: {
    ordered: (state) => {
      state.numOfCakes--;
    },
    restocked: (state, action) => {
      state.numOfCakes += action.payload;
    },
  },
});

const cakeActions = cakeSlice.actions;
const cakeReducer = cakeSlice.reducer;

export { cakeReducer as default, cakeActions };
