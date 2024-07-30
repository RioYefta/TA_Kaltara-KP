'use client'
import React from 'react'
import { useAdminValidation } from '../../../hooks/useAdminValidation';
import LoadingComponent from '../../../components/loadingPage/page';
import TabelPengguna from '../../../components/_admin/TabelPengguna';

/**
 * Komponen Pengguna
 * Menangani tampilan dan interaksi untuk pengelolaan pengguna oleh admin.
 * 
 * - Menggunakan useAdminValidation untuk memvalidasi status pengguna dan peran.
 * - Menampilkan komponen LoadingComponent saat proses loading.
 * - Mengalihkan pengguna yang tidak terautentikasi atau bukan admin.
 */


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