import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import { routes } from './routes'
import SideBar from './SideBar'

const router = createBrowserRouter(routes)
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <div className="main">
      <SideBar />
      <div>
        <RouterProvider router={router} />
      </div>
    </div>
  </React.StrictMode>
)
