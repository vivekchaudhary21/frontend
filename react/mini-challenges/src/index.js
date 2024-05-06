import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Link } from 'react-router-dom'
import './index.css'
import App from './App'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <BrowserRouter>
    <div style={{ textAlign: 'center', position: 'fixed', zIndex: 9999 }}>
      <Link className="btn btn-link" to="/">
        Home
      </Link>
    </div>
    <App />
  </BrowserRouter>
)
