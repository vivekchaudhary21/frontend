import React from 'react'

import './App.css'
import { Counter } from './features/counter/Counter'
import { MultiStateView } from './features/multiState/multiStateView'

const App = () => {
  return (
    <div className="App">
      <div className="main">
        <Counter />
        <MultiStateView />
      </div>
    </div>
  )
}

export default App
