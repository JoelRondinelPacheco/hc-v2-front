import React from 'react'
import ReactDOM from 'react-dom/client'
import router from "./router"
import './index.css'
import { RouterProvider } from 'react-router-dom'
import AuthContextProvier from './context/auth-context'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>

      <AuthContextProvier>
        <RouterProvider router={router} />
      </AuthContextProvier>
  </React.StrictMode>
)
