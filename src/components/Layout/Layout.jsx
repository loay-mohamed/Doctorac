import React from 'react'
import Navbar from '../Navber/Navbar'
import { Outlet, useLocation } from 'react-router-dom'
import Footer from '../Footer/Footer'
import AuthPage from '../../pages/AuthPage/AuthPage'

const Layout = () => {
  const location = useLocation()

  const isAuthPage = location.pathname === '/';

  return (
    <>
      <Navbar />
      <div className='container mx-auto'>
        {!isAuthPage && <Outlet />}
        {isAuthPage && <AuthPage />}
      </div>
      <div>
        <Footer />
      </div>
    </>
  )
}

export default Layout
