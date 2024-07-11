import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {RouterProvider } from 'react-router-dom'
import GlobalContextProvider from './context/global-context'
import router from './router'
import { configApiClientInterceptors } from './lib/common/adapter/out/http/api-client'


configApiClientInterceptors();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <GlobalContextProvider>
        <RouterProvider router={router} />
      </GlobalContextProvider>
  </React.StrictMode>
)
