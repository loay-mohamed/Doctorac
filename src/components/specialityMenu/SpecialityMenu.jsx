import React from 'react'
import { assets, specialityData } from '../../assets/assets'
import { NavLink,Link } from "react-router-dom";

const SpecialityMenu = () => {
  return (
    <>
    <div >
        <div className='flex flex-col items-center gap-4 py-16 text-gray-800'>
            <h2 className='text-3xl font-medium'>Find by Speciality </h2>
            <p className='sm:w-1/3 text-center text-sm'>Simply browse through our extensive list of trusted doctors,<br /> schedule your appointment hassle-free.</p>
        </div>
        <div className='flex sm:justify-center gap-4 pt-5 w-full '>
            {specialityData.map((special)=>(
                <Link onClick={()=>scrollTo(0,0)} className='flex flex-col items-center text-xs cursor-pointer flex-shrink-0 hover:translate-y-[-10px] transition-all duration-500'  to={`/doctors/${special.speciality}`}>
                    <img src={special.image} alt="" className='w-16 sm:w-24 mb-2' />
                    <p className='text-gray-700 mt-6'>{special.speciality}</p>
                </Link>
            ))}
        </div>
    </div>
    </>
  )
}

export default SpecialityMenu