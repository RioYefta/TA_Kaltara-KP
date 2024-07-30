import { useState, useEffect } from 'react';
import { fetchSectors } from '../../services/crewService';

/**
 * Hook useSectors
 * Mengambil dan mengelola data sektor.
 * 
 * - Menggunakan useState untuk menyimpan data sektor dan error.
 * - Menggunakan useEffect untuk memanggil fungsi fetchSectors saat komponen di-mount.
 * - Mengembalikan objek yang berisi data sektor dan error.
 */

export const useSectors = () => {
    const [sectors, setSectors] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchSectors();
                setSectors(data);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchData();
    }, []);

    return { sectors, error };
};
