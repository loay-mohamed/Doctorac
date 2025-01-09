import React, { useState, useEffect } from 'react';
import { assets } from '../../assets/assets';
import { NavLink, useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../firebaseConfig"; 

const Navbar = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [user, setUser] = useState(null); 

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <>
    
    <div className="container mx-auto">

    <div className='flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400'>
      <h1 onClick={() => navigate('/home')} className='w-44 cursor-pointer font-bold text-gray-700 mb-3 text-2xl ms-8'>DOCTORAC</h1>
      {user && ( 
        <ul className='hidden md:flex items-start gap-5 font-medium'>
          <NavLink to='/home'>
            <li className='py-1'>HOME</li>
          </NavLink>
          <NavLink to='/doctors'>
            <li className='py-1'>ALL DOCTORS</li>
          </NavLink>
          <NavLink to='/about'>
            <li className='py-1'>ABOUT</li>
          </NavLink>
          <NavLink to='/contact'>
            <li className='py-1'>CONTACT</li>
          </NavLink>
        </ul>
      )}
      <div className='flex items-center gap-4 '>
        {user ? (
          <div className='flex items-center gap-2 cursor-pointer group relative '>
            <img className='w-7 rounded-full' src={assets.logout} alt="Profile Picture" />
            <img className='w-2.5' src={assets.dropdown_icon} />
            <div className='absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block'>
              <div className='min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4'>
                <p onClick={handleLogout} className='hover:text-black cursor-pointer'>Logout</p>
              </div>
            </div>
          </div>
        ) : (
          <button onClick={() => navigate('/login')} className='bg-slate-600 mx-8 text-white px-8 py-3 rounded-full font-light hidden md:block'>Create account</button>
        )}
        <img onClick={() => setShowMenu(true)} className='w-6 md:hidden' src={assets.menu_icon} alt="" />

        <div className={`${showMenu ? 'fixed w-full' : 'h-0 w-0'} md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all`}>
          <div className='flex items-center justify-between px-5 py-6'>
            <img className='w-7' onClick={() => setShowMenu(false)} src={assets.cross_icon} alt="" />
          </div>
          <ul className='flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium'>
            {user && (
              <>
                <NavLink onClick={() => setShowMenu(false)} to="/"><p className='px-4 py-2 rounded inline-block'>Home</p></NavLink>
                <NavLink onClick={() => setShowMenu(false)} to="/doctors"><p className='px-4 py-2 rounded inline-block'>ALL DOCTORS</p></NavLink>
                <NavLink onClick={() => setShowMenu(false)} to="/about"><p className='px-4 py-2 rounded inline-block'>ABOUT</p></NavLink>
                <NavLink onClick={() => setShowMenu(false)} to="/contact"><p className='px-4 py-2 rounded inline-block'>CONTACT</p></NavLink>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
    </div>
    </>
  );
};

export default Navbar;
