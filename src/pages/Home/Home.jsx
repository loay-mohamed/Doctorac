import React from 'react'
import Header from '../../components/Header/Header'
import SpecialityMenu from '../../components/specialityMenu/SpecialityMenu'
import TopDoctors from '../../components/TopDoctors/TopDoctors'
import Banner from '../../components/Banner/Banner'

const Home = () => {
  return (
    <>
    <Header/>
    <SpecialityMenu/>
    <TopDoctors/>
    <Banner/>
    </>
  )
}

export default Home