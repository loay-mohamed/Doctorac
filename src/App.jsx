import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home/Home'
import Layout from './components/Layout/Layout'
import Doctors from './pages/Doctors/Doctors'
import About from './pages/About/About'
import Contact from './pages/Contact/Contact'
import MyAppointments from './pages/MyAppointments/MyAppointments'
import Appointment from './pages/Appointment/Appointment'
import AppProvider from './context/App.Context'
import { AuthProvider } from './context/AuthContext'
import AuthPage from './pages/AuthPage/AuthPage'
import { Toaster } from 'react-hot-toast'

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/", element: <Layout />, children: [
        { path: "/doctors", element: <Doctors /> },
        { path: "/login", element: <AuthPage /> },
        { path: "/home", element: <Home /> },
        { path: "/about", element: <About /> },
        { path: "/contact", element: <Contact /> },
        { path: "/doctors/:speciality", element: <Doctors /> },
        { path: "/appointment/:docId", element: <Appointment /> },
        { path: "/MyAppointments", element: <MyAppointments /> },


      ]
    },


  ])
  return (
    <>
    <AuthProvider>
      
      <AppProvider>
        <RouterProvider router={router} />
      </AppProvider>
    </AuthProvider>
    <Toaster/>
    
    </>
  )
}

export default App