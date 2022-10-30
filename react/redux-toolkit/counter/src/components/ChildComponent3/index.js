import React from 'react'
import { useSelector } from 'react-redux'

export const ChildComponent3 = () => {
  const count = useSelector(state => state.counter.value)
  return (
    <div>
      <h2>Child Component 3 showing count value : {count}</h2>
    </div>
  )
}
