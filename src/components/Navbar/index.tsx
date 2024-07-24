import { useEffect, useState } from 'react';
import { List, X, House, Receipt, User, Bell } from "@phosphor-icons/react";
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const [nav, setNav] = useState(false);
    const navigate = useNavigate()

    const handleNav = () => {
        setNav(!nav);
    };

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 768) {
                setNav(false);
            }
        };

        handleResize();

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <header className="bg-primary-100 py-4" >
            <div className="container flex justify-between items-center max-w-[1240px] mx-auto">
                <img onClick={() => navigate('/')} src="/images/logo.png" alt="Logo" className="h-8" />
                <ul className='hidden md:flex gap-6 text-white'>
                    <a onClick={() => navigate('/')} className="cursor-pointer gap-[6px] flex items-center">
                        <House size={20} color='#fff' weight="fill" />
                        <p>Beranda</p>
                    </a>
                    <a onClick={() => navigate('/mutasi')} className="cursor-pointer gap-[6px] flex items-center">
                        <Receipt size={20} color='#fff' weight="fill" />
                        <p>Mutasi</p>
                    </a>
                    <a onClick={() => navigate('/notifikasi')} className="cursor-pointer gap-[6px] flex items-center">
                        <Bell size={20} color='#fff' weight="fill" />
                        <p>Notifikasi</p>
                    </a>
                    <a onClick={() => navigate('/')} className="cursor-pointer gap-[6px] flex items-center">
                        <User size={20} color='#fff' weight="fill" />
                        <p>Profile</p>
                    </a>
                </ul>
                <div onClick={handleNav} className='block md:hidden z-10 text-white'>
                    {nav ? <X size={32} /> : <List size={32} />}
                </div>
            </div>
            {nav ?
                <div className='fixed top-20 w-full h-full bg-[#000] z-[10] opacity-80'>
                </div>
                : <></>}
            <ul className={`fixed top-20 font-bold h-full text-primary-100 text-nunito bg-white z-[11] ${nav ? 'right-0 w-[60%] duration-500' : 'duration-500 right-[-400px]'}`}>
                <a onClick={() => navigate('/')} className="cursor-pointer p-4 flex gap-2 items-center">
                    <House size={20} color='#115DA9' weight="fill" />
                    <p>Beranda</p>
                </a>
                <a onClick={() => navigate('/mutasi')} className="cursor-pointer p-4 flex gap-2 items-center">
                    <Receipt size={20} color='#115DA9' weight="fill" />
                    <p>Mutasi</p>
                </a>
                <a onClick={() => navigate('/notifikasi')} className="cursor-pointer p-4 flex gap-2 items-center">
                    <Bell size={20} color='#115DA9' weight="fill" />
                    <p>Notifikasi</p>
                </a>
                <a onClick={() => navigate('/')} className="cursor-pointer p-4 flex gap-2 items-center">
                    <User size={20} color='#115DA9' weight="fill" />
                    <p>Profile</p>
                </a>
            </ul>

        </header>
    );
};

export default Navbar;
