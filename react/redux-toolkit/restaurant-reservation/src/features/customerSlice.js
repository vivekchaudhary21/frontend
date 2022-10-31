import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: []
}

const customerFoodSlice = createSlice({
  name: 'customerFood',
  initialState,
  reducers: {
    addCustomer: (state, action) => {
      state.value.push(action.payload)
    },
    addFood: (state, action) => {
      const { id, food } = action.payload
      const idx = state.value.findIndex(person => person.id === id)
      state.value[idx].food.push(food)
    }
  }
})

export default customerFoodSlice.reducer
export const { addFood, addCustomer } = customerFoodSlice.actions
