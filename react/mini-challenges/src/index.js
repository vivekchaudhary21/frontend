import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import SideBar from './components/SideBar'
import App from './App'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <main>
        <SideBar />
        <App />
      </main>
    </BrowserRouter>
  </React.StrictMode>
)
