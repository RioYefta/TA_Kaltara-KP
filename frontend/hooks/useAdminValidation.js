import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase/config';
import { fetchUserRole } from '../services/roleService';

export const useAdminValidation = () => {
    const [user, loading] = useAuthState(auth);
    const [userRole, setUserRole] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const fetchRole = async () => {
            if (user) {
                try {
                    const role = await fetchUserRole(user.uid);
                    setUserRole(role);
                } catch (error) {
                    console.error("Failed to fetch user role:", error);
                    router.push('/');
                }
            }
        };

        fetchRole();
    }, [user, router]);

    // Handle loading state and user redirection
    if (loading) {
        return { loading: true, user: null, userRole: null };
    }

    if (!user) {
        router.push('/');
        return { loading: false, user: null, userRole: null };
    }

    if (userRole === null) {
        return { loading: true, user, userRole: null }; // Return loading if role is still being fetched
    }

    if (userRole !== 'admin') {
        router.push('/user/kehadiran');
        return { loading: false, user, userRole: null };
    }

    return { loading: false, user, userRole };
};