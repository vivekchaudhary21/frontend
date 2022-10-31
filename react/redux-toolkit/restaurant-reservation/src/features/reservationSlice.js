import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: []
}

const reservationSlice = createSlice({
  name: 'reservationSlice',
  initialState,
  reducers: {
    addReservation: (state, action) => {
      state.value.push(action.payload)
    },
    deleteReservation: (state, action) => {
      state.value = state.value.filter(person => person.id !== action.payload)
    }
  }
})

export const { addReservation, deleteReservation } = reservationSlice.actions
export default reservationSlice.reducer
