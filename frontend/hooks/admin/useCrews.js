import { useState, useEffect } from 'react';
import { fetchCrews } from '../../services/teknisiService';

/**
 * Hook useCrews
 * Mengambil dan mengelola data crew.
 * 
 * - Menggunakan useState untuk menyimpan data crew dan error.
 * - Menggunakan useEffect untuk memanggil fungsi fetchCrews saat komponen di-mount.
 * - Mengembalikan objek yang berisi data crew dan error.
 */

export const useCrews = () => {
    const [crews, setCrews] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchCrews();
                setCrews(data);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchData();
    }, []);

    return { crews, error };
};
