import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { RouterProvider } from 'react-router-dom'

import AuthProvider from './Provider/AuthProvider.jsx'
import { ToastContainer } from 'react-toastify'
import RouterComponent from './Router/Router.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <>
        <RouterProvider router={RouterComponent} />
        <ToastContainer /> 
      </>
    </AuthProvider>
  </StrictMode>
); // ✅ semicolon added
