"use client"
import { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/navigation';
import { auth } from '../firebase/config';
import { fetchUserRole } from '../services/authService';
import LoadingComponent from '../components/loadingPage/page';
import LoginForm from '../components/auth/LoginForm';

/**
 * Komponen Login
 * Menangani proses login pengguna dan pengalihan berdasarkan status autentikasi.
 * 
 * - Menggunakan useAuthState untuk memantau status autentikasi pengguna.
 * - Jika pengguna sudah terautentikasi, ambil peran pengguna dan alihkan ke halaman yang sesuai.
 * - Tampilkan komponen LoadingComponent saat proses loading.
 */

export default function Login() {
  const router = useRouter();
  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    if (loading) return;
    if (user) {
      fetchUserRole(user, router);
    }
  }, [user, loading, router]);

  if (loading || user) {
    return <LoadingComponent />;
  }

  return (
    <div className="w-full h-screen flex items-center justify-center bg-gray-100 p-4 sm:p-6 lg:p-8">
      <LoginForm />
    </div>
  );
}