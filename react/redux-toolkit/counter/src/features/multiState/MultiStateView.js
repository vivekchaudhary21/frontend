import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { incrementCounter, decrementCounter, changeName, toggleFlag } from './multiStateSlice'

const MultiStateView = () => {
  const { counter, name, flag } = useSelector(state => state.multiState)
  const dispatch = useDispatch()
  return (
    <>
      <h2>Redux Toolkit Example one reducer multiple states</h2>
      <h4>Counter : {counter}</h4>
      <button onClick={() => dispatch(incrementCounter())}>Increment</button>
      <button onClick={() => dispatch(decrementCounter())}>Decrement</button>
      <h4>Flag: {flag ? 'true' : 'false'}</h4>
      <button onClick={() => dispatch(toggleFlag())}>Toggle Flag</button>
      <h4>Name: {name}</h4>
      Change name: <input value={name} onChange={e => dispatch(changeName(e.target.value))} />
    </>
  )
}

export { MultiStateView }
