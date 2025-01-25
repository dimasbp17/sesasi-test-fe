import React, { useEffect, useState } from 'react';
import { IoClose, IoMenu } from 'react-icons/io5';
import { Link, useLocation } from 'react-router-dom';
import logo_project from '../../public/assets/images/logo-project.png';

const Navbar = () => {
  const [openNav, setOpenNav] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 960) {
        setOpenNav(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navList = (
    <ul className="flex flex-col gap-2 mt-5 text-sm text-black font-poppins lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-16">
      <Link
        to={'/'}
        className={`flex items-center ${
          location.pathname === '/' ? 'border-b-2 border-oren text-biru' : ''
        }`}
      >
        Home
      </Link>
      <Link
        to={'/about'}
        className={`flex items-center ${
          location.pathname === '/about'
            ? 'border-b-2 border-oren text-biru'
            : ''
        }`}
      >
        About
      </Link>
    </ul>
  );

  return (
    <div className="w-full">
      <div className="sticky top-0 z-10 max-w-full px-4 py-4 bg-white rounded-none shadow-md lg:px-20 lg:py-5">
        <div className="flex items-center justify-between">
          <Link to={'/'}>
            <img
              src={logo_project}
              alt="Logo"
              className="w-24 lg:w-32"
            />
          </Link>

          <div className="flex items-center gap-4">
            <div className="hidden lg:block">{navList}</div>

            <button
              className="w-6 h-6 ml-auto text-black lg:hidden"
              onClick={() => setOpenNav(!openNav)}
            >
              {openNav ? <IoClose size={25} /> : <IoMenu size={25} />}
            </button>
          </div>
        </div>

        {openNav && <div className="mt-4 lg:hidden">{navList}</div>}
      </div>
    </div>
  );
};

export default Navbar;
