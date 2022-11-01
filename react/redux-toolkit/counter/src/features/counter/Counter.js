import React, { useState, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { addOne, subtractOne, addCustomValue, subtractCustomValue, resetAll } from './counterSlice'

export const Counter = () => {
  const count = useSelector(state => state.counter.value)
  const dispatch = useDispatch()
  const [amount, setAmount] = useState('')
  const addValue = Number(amount) || 0

  const onAdd = useCallback(() => {
    dispatch(addOne())
  }, [dispatch])

  const onSubtract = useCallback(() => {
    dispatch(subtractOne())
  }, [dispatch])

  const onCustomAdd = () => {
    dispatch(addCustomValue(addValue))
  }

  const onCustomSubtract = () => {
    dispatch(subtractCustomValue(addValue))
  }
  const onReset = () => {
    setAmount('')
    dispatch(resetAll())
  }

  return (
    <>
      <h1>Counter</h1>
      <h2>{count}</h2>
      <button onClick={onAdd}>Add One</button>
      <button onClick={onSubtract}>Subtract One</button>
      <br />
      <input value={amount} onChange={e => setAmount(e.target.value)} /> <br />
      <button onClick={onCustomAdd}>Add Amount</button>
      <button onClick={onCustomSubtract}>Subtract Amount</button>
      <br />
      <button onClick={onReset}>Reset All</button>
    </>
  )
}
