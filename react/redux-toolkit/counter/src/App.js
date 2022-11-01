import React from 'react'

import './App.css'
import { Counter } from './features/counter/Counter'

const App = () => {
  return (
    <div className="App">
      <div className="main">
        <Counter />
      </div>
    </div>
  )
}

export default App
