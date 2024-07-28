'use client'
import React from 'react'
import { useAdminValidation } from '../../../hooks/useAdminValidation'; // Import the custom hook
import LoadingComponent from '../../../components/loadingPage/page';
import TambahTeknisi from '../../../components/_admin/TambahTeknisi'
import TabelTeknisi from '../../../components/_admin/TabelTeknisi'
import TambahCrew from '../../../components/_admin/TambahCrew';

function AdminTeknisi() {
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
    
  return (
    <div className='p-4 md:p-7'>
        <h2 className='font-bold text-xl md:text-2xl flex justify-between items-center'>Teknisi</h2>
        <div className='flex flex-col md:flex-row gap-3'>
          <TambahTeknisi />
        </div>
        <div className='flex flex-col md:flex-row gap-3'>
          <TambahCrew />
        </div>
        <div className='mt-3'>
          <TabelTeknisi />
        </div>
    </div>
  )
}

export default AdminTeknisi