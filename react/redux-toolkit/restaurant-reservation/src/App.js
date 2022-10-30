import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './App.css'
import { addReservation, deleteReservation } from './features/reservationSlice'

function App() {
  const [inputValue, setInputValue] = useState('')
  const dispatch = useDispatch()
  const reservations = useSelector(state => state.reservations.value)

  const onChangeHandler = e => {
    setInputValue(e.target.value)
  }

  const onClickHandler = () => {
    if (!inputValue) return
    dispatch(addReservation(inputValue))
    setInputValue('')
  }

  const onRemoveHandler = name => {
    dispatch(deleteReservation(name))
  }

  return (
    <div className="App">
      <div className="container">
        <div className="reservation-container">
          <div>
            <h5 className="reservation-header">Reservations</h5>
            <div className="reservation-cards-container">
              {reservations.length > 0 &&
                reservations.map((name, i) => {
                  return (
                    <React.Fragment key={i}>
                      <div className="reservation-card-container">
                        {name}
                        <button onClick={() => onRemoveHandler(name)}>Remove</button>
                      </div>
                    </React.Fragment>
                  )
                })}
            </div>
          </div>
          <div className="reservation-input-container">
            <input value={inputValue} onChange={onChangeHandler} />
            <button onClick={onClickHandler}>Add</button>
          </div>
        </div>
        <div className="customer-food-container">
          <div className="customer-food-card-container">
            <p>Selena Gomez</p>
            <div className="customer-foods-container">
              <div className="customer-food"></div>
              <div className="customer-food-input-container">
                <input />
                <button>Add</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
