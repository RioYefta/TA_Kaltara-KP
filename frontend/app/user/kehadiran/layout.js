'use client'
import React, { useState } from 'react'
import SideNav from '../../../components/_user/SideNav'
import Header from '../../../components/Header'
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/firebase/config';
import { useRouter } from 'next/navigation';
import LoadingComponent from '../../../components/loadingPage/page';
import { Menu, X } from 'lucide-react';

function Layout({ children }) {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();
  const [isSideNavOpen, setIsSideNavOpen] = useState(false);

  if (loading) {
    return <LoadingComponent />;
  }

  if (!user) {
    router.push('/');
    return null; 
  }

  const toggleSideNav = () => {
    setIsSideNavOpen(!isSideNavOpen);
  };

  return (
    <div>
      <div className='md:w-64 h-screen fixed hidden md:block'>
        <SideNav/>
      </div>
      <div className='md:ml-64'>
        <Header className='w-full'/>
        <div className='md:hidden flex items-center justify-between p-4'>
          <button onClick={toggleSideNav}>
            {isSideNavOpen ? <X /> : <Menu />}
          </button>
        </div>
        <div className={`fixed inset-0 bg-gray-800 bg-opacity-75 z-50 transition-opacity duration-300 ${isSideNavOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
          <div className={`fixed top-0 left-0 w-64 h-full bg-white transition-transform duration-300 ${isSideNavOpen ? 'transform-none' : '-translate-x-full'}`}>
            <SideNav />
            <button onClick={toggleSideNav} className='absolute top-4 right-4'>
              <X />
            </button>
          </div>
        </div>
        {children}
      </div>
    </div>
  )
}

export default Layout;