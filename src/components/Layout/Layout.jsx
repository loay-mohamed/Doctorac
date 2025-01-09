import React from 'react'
import Navbar from '../Navber/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../Footer/Footer'
const Layout = () => {
  return (
    <>
    
      <Navbar/>
      <div className='container mx-auto '>
      <Outlet></Outlet>
      </div>
      <div>

      <Footer/>
      </div>
    </>
  )
}

export default Layout