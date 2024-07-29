"use client"
import { MoreVertical, LogOut } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import Avatar from 'react-avatar';
import { menuList } from '../../services/userMenuService'; 
import { useUserDetails } from '../../hooks/useUserDetails';
import { handleLogout } from '../../services/authService';


function SideNav() {
  const path = usePathname();
  const [showLogout, setShowLogout] = useState(false);
  const { userDetails } = useUserDetails();

  const toggleLogout = () => {
      setShowLogout(!showLogout);
  };

  return (
    <div className='border shadow-md min-h-screen p-5 flex flex-col'>
      <Image
        src={'/Logo_TA.PNG'}
        width={180} height={50}
        alt='logo'
      />

      <hr className='my-5'></hr>

      {menuList.map((menu, index) => (
        <Link key={index} href={menu.path}>
          <h2 className={`
            flex items-center gap-3 p-4 my-2
            text-md text-slate-500
            hover:bg-primary hover:text-white cursor-pointer
            rounded-lg
            ${path == menu.path && 'bg-primary text-white'}
          `}>
            <menu.icon />
            {menu.name}
          </h2>
        </Link>
      ))}

      <div className='mt-auto flex gap-2 items-center'>
        {userDetails?.photoURL ? (
          <Image
            src={userDetails.photoURL}
            width={35} height={35}
            alt='profile'
            className='rounded-full'
          />
        ) : (
          <Avatar
            name={userDetails?.email} size="35" round={true} />
        )}
        {userDetails ? (
          <div className='flex items-center relative'>
            <div>
              <h2 className='text-sm font-bold'>User : {userDetails.name}</h2>
              <p className='text-xs text-slate-400'>Email : {userDetails.email}</p>
            </div>
            <MoreVertical className='cursor-pointer ml-2' onClick={toggleLogout} />
            <div className={`
              absolute top-[-50px] right-0 transition-opacity duration-300 ease-in-out
              ${showLogout ? 'opacity-100 visible' : 'opacity-0 invisible'}
              `}>
              <div className='
              flex items-center justify-center w-10 h-10
              bg-transparent hover:bg-red-500 transition-colors
              border border-gray-300 shadow-sm rounded-full
              '>
                <LogOut
                  onClick={handleLogout}
                  className='cursor-pointer text-red-500 hover:text-white'
                />
              </div>
            </div>
          </div>
        ) : (
          <div>
            <h2>Loading...</h2>
          </div>
        )}
      </div>
    </div>
  )
}

export default SideNav;