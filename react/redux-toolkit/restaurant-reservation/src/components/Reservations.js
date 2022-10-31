import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'

import { addReservation } from '../features/reservationSlice'
import { ReservationCard } from './ReservationCard'

const Reservations = () => {
  const [name, setName] = useState('')
  const reservations = useSelector(state => state.reservations.value)
  const dispatch = useDispatch()

  const onChangeHandler = e => {
    setName(e.target.value)
  }

  const onAddReservation = () => {
    if (!name) return
    dispatch(addReservation({ name, id: uuidv4() }))
    setName('')
  }
  return (
    <div className="reservation-container">
      <div>
        <h5 className="reservation-header">Reservations</h5>
        <div className="reservation-cards-container">
          {reservations.length > 0 && reservations.map(person => <ReservationCard person={person} key={person.id} />)}
        </div>
      </div>
      <div className="reservation-input-container">
        <input value={name} onChange={onChangeHandler} />
        <button onClick={onAddReservation}>Add</button>
      </div>
    </div>
  )
}

export { Reservations }
