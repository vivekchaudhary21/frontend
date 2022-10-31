import React from 'react'

import './App.css'
import { Customers, Reservations } from './components'

function App() {
  return (
    <div className="App">
      <div className="container">
        <Reservations />
        <Customers />
      </div>
    </div>
  )
}

export default App
