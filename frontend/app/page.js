"use client"
import { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/navigation';
import { auth } from '../firebase/config';
import { fetchUserRole } from '../services/authService';
import LoadingComponent from '../components/loadingPage/page';
import LoginForm from '../components/auth/LoginForm';

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
