import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {RouterProvider } from 'react-router-dom'
import GlobalContextProvider from './lib/common/infrastructure/react/global-context'
import router from './router'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <GlobalContextProvider>
        <RouterProvider router={router} />
      </GlobalContextProvider>
  </React.StrictMode>
)
