import React from 'react'
import { useDispatch } from 'react-redux'

import { deleteReservation } from '../features/reservationSlice'
import { addCustomer } from '../features/customerSlice'

const ReservationCard = ({ person }) => {
  const dispatch = useDispatch()

  const onRemoveReservation = id => {
    dispatch(deleteReservation(id))
  }

  const onMoveReservation = person => {
    dispatch(deleteReservation(person.id))
    dispatch(
      addCustomer({
        ...person,
        food: []
      })
    )
  }
  return (
    <React.Fragment key={person.id}>
      <div className="reservation-card-container">
        {person.name}
        <button onClick={() => onRemoveReservation(person.id)}>Remove</button>
        <button onClick={() => onMoveReservation(person)}>Move</button>
      </div>
    </React.Fragment>
  )
}

export { ReservationCard }
