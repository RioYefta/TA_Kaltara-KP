'use client'
import React from 'react'
import { useAdminValidation } from '../../../hooks/useAdminValidation'; // Import the custom hook
import LoadingComponent from '../../../components/loadingPage/page';
import TabelPengguna from '../../../components/_admin/TabelPengguna';


function Pengguna() {
    const { loading, user, userRole } = useAdminValidation(); // Use the custom hook

    if (loading) {
      return <LoadingComponent />;
    }

    if (!user) {
      return null; // Redirect handled in the hook
    }

    if (userRole !== 'admin') {
      return null; // Redirect handled in the hook
    }

  return(
    <div className='p-4 md:p-7'>
        <h2 className='font-bold text-xl md:text-2xl flex justify-between items-center'>Pengguna</h2>
        <div className='mt-3'>
          <TabelPengguna />
        </div>
    </div>
  )
}

export default Pengguna