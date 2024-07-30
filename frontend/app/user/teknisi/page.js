'use client'
import React from 'react'
import TabelTeknisi from '../../../components/_user/TabelTeknisi'
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/firebase/config';
import { useRouter } from 'next/navigation';
import LoadingComponent from '../../../components/loadingPage/page';

/**
 * Komponen UserTeknisi
 * Menangani tampilan dan interaksi untuk pengelolaan teknisi.
 * 
 * - Menggunakan useAuthState untuk memantau status autentikasi pengguna.
 * - Menampilkan komponen LoadingComponent saat proses loading.
 * - Mengalihkan pengguna yang tidak terautentikasi ke halaman utama.
 */

function UserTeknisi() {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();

  if (loading) {
    return <LoadingComponent />;
  }

  if (!user) {
    return router.push('/');
  }
  
  return (
    <div className='p-7'>
        <h2 className='font-bold text-2xl flex justify-between items-center'>Teknisi
        </h2>
        <TabelTeknisi />
    </div>
  )
}

export default UserTeknisi