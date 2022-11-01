import { createSlice } from '@reduxjs/toolkit'

const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    value: 0
  },
  reducers: {
    addOne: state => {
      state.value += 1
    },
    subtractOne: state => {
      state.value -= 1
    },
    addCustomValue: (state, action) => {
      state.value += action.payload
    },
    subtractCustomValue: (state, action) => {
      state.value -= action.payload
    },
    resetAll: state => {
      state.value = 0
    }
  }
})

export default counterSlice.reducer
export const { addOne, subtractOne, addCustomValue, subtractCustomValue, resetAll } = counterSlice.actions
