import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  counter: 0,
  name: 'Foo',
  flag: false
}

const multiStateSlice = createSlice({
  name: 'multiStateSlice',
  initialState,
  reducers: {
    incrementCounter: state => {
      state.counter = state.counter + 1
    },
    decrementCounter: state => {
      state.counter = state.counter - 1
    },
    changeName: (state, action) => {
      state.name = action.payload
    },
    toggleFlag: state => {
      state.flag = !state.flag
    }
  }
})

export default multiStateSlice.reducer

export const { incrementCounter, decrementCounter, changeName, toggleFlag } = multiStateSlice.actions
