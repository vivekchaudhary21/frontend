import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import { addFood } from '../features/customerSlice'

const CustomerCard = ({ customer }) => {
  const [foodInput, setFoodInput] = useState('')
  const dispatch = useDispatch()

  const onAddFood = (id, foodItem) => {
    dispatch(
      addFood({
        id,
        food: foodItem
      })
    )
    setFoodInput('')
  }

  return (
    <div className="customer-food-card-container" key={customer.id}>
      <p>{customer.name}</p>
      <div className="customer-foods-container">
        {customer.food.map((item, index) => (
          <div className="customer-food" key={index}>
            {item}
          </div>
        ))}
        <div className="customer-food-input-container">
          <input value={foodInput} onChange={e => setFoodInput(e.target.value)} />
          <button onClick={() => onAddFood(customer.id, foodInput)}>Add</button>
        </div>
      </div>
    </div>
  )
}

export { CustomerCard }
