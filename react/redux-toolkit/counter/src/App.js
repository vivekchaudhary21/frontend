import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { ParentComponent } from './components/ParenComponent'
import { addOne, subtractOne } from './features/counter/counterSlice'
import './App.css'

function App() {
  const count = useSelector(state => state.counter.value)
  const dispatch = useDispatch()

  const onAdd = useCallback(() => {
    dispatch(addOne())
  }, [dispatch])

  const onSubtract = useCallback(() => {
    dispatch(subtractOne())
  }, [dispatch])

  return (
    <div className="App">
      <div className="main">
        <h1>Counter</h1>
        <button onClick={onAdd}>Add One</button>
        <p>{count}</p>
        <button onClick={onSubtract}>Subtract One</button>
        <ParentComponent />
      </div>
    </div>
  )
}

export default App
