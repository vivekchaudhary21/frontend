import { configureStore } from '@reduxjs/toolkit'
import reservationReducer from '../features/reservationSlice'

const store = configureStore({
  reducer: {
    reservations: reservationReducer
  }
})

export default store
