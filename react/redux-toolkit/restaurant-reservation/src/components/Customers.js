import React from 'react'
import { useSelector } from 'react-redux'
import { CustomerCard } from './CustomerCard'

const Customers = () => {
  const customers = useSelector(state => state.customers.value)
  return (
    <div className="customer-food-container">
      {customers.length > 0 && customers.map(customer => <CustomerCard customer={customer} key={customer.id} />)}
    </div>
  )
}

export { Customers }
