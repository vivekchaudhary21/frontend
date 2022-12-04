import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../features/counter/counterSlice'
import multiStateReducer from '../features/multiState/multiStateSlice'

const store = configureStore({
  reducer: {
    counter: counterReducer,
    multiState: multiStateReducer
  }
})

export { store }
