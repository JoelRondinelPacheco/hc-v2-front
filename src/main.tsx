import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {RouterProvider } from 'react-router-dom'
import AuthContextProvier from './context/auth-context'
import router from './router'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <AuthContextProvier>
        <RouterProvider router={router} />
      </AuthContextProvier>
  </React.StrictMode>
)
