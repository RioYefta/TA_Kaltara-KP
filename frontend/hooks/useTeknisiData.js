import { useState, useEffect } from 'react';
import { fetchTeknisiData } from '../services/teknisiService';

/**
 * Hook useTeknisiData
 * Mengambil dan mengelola data teknisi.
 * 
 * - Menggunakan useState untuk menyimpan data teknisi dan error.
 * - Menggunakan useEffect untuk memanggil fungsi fetchTeknisiData saat komponen di-mount.
 * - Mengembalikan objek yang berisi data teknisi dan error.
 */

export const useTeknisiData = () => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await fetchTeknisiData();
                setData(result);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchData();
    }, []);

    return { data, error };
};
