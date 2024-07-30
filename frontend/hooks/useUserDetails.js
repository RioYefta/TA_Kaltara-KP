import { useState, useEffect } from 'react';
import { fetchUserData } from '../services/roleService';

/**
 * Hook useUserDetails
 * Mengambil dan mengelola detail pengguna.
 * 
 * - Menggunakan useState untuk menyimpan detail pengguna.
 * - Menggunakan useEffect untuk memanggil fungsi fetchUserData saat komponen di-mount.
 * - Mengembalikan objek yang berisi detail pengguna.
 */

export const useUserDetails = () => {
    const [userDetails, setUserDetails] = useState(null);

    useEffect(() => {
        fetchUserData(setUserDetails);
    }, []);

    return { userDetails };
};
