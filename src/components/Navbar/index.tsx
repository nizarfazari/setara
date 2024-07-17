import React, { useState } from 'react';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';

const Navbar = () => {
  const [nav, setNav] = useState(false);

  const handleNav = () => {
    setNav(!nav);
  };

  return (
    <header className="bg-primary-100 py-4" >
        <div className="container flex justify-between items-center max-w-[1240px] mx-auto px-4">
            <img src="/images/logo.png" alt="Logo" className="h-12" />
            <ul className='hidden md:flex text-nunito'>
                <a href="#beranda" className=" text-white px-4 py-2 flex items-center">
                <img src="/images/icons/House.svg" alt="Beranda" className="h-6 mr-2" />
                Beranda
                </a>
                <a href="#mutasi" className=" text-white px-4 py-2 flex items-center">
                    <img src="/images/icons/Receipt.svg" alt="Mutasi" className="h-6 mr-2" />
                    Mutasi
                </a>
                <a href="#notif" className=" text-white px-4 py-2 flex items-center">
                    <img src="/images/icons/Bell.svg" alt="Notifikasi" className="h-6 mr-2" />
                    Notifikasi
                </a>
                <a href="#profile" className=" text-white px-4 py-2 flex items-center">
                    <img src="/images/icons/User.svg" alt="Profile" className="h-6 mr-2" />
                    Profile
                </a>
            </ul>
            <div onClick={handleNav} className='block md:hidden z-10 text-white'>
                {nav ? <AiOutlineClose size={20}/> : <AiOutlineMenu size={20} />}
            </div>
            <ul className={nav ? ' fixed right-0 top-20 w-[60%] h-full text-white text-nunito bg-primary-100 ease-in-out duration-500' : 'ease-in-out duration-500 fixed left-[-100%]' }>
                <a href="#beranda" className="px-4 py-4 flex items-center">
                    <img src="/images/icons/House.svg" alt="Beranda" className="h-6 mr-2" />
                    Beranda
                </a>
                <a href="#mutasi" className="px-4 py-4 flex items-center">
                    <img src="/images/icons/Receipt.svg" alt="Mutasi" className="h-6 mr-2" />
                    Mutasi
                </a>
                <a href="#notif" className="px-4 py-4 flex items-center">
                    <img src="/images/icons/Bell.svg" alt="Notifikasi" className="h-6 mr-2" />
                    Notifikasi
                </a>
                <a href="#profile" className="px-4 py-4 flex items-center">
                    <img src="/images/icons/User.svg" alt="Profile" className="h-6 mr-2" />
                    Profile
                </a>
            </ul>
        </div>
    </header>
  );
};

export default Navbar;
