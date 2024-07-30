import { useState, useEffect } from 'react';
import { fetchKehadiranData } from '../services/kehadiranService';

/**
 * Hook useKehadiranData
 * Mengambil dan mengelola data kehadiran teknisi.
 * 
 * - Menggunakan useState untuk menyimpan data kehadiran dan error.
 * - Menggunakan useEffect untuk memanggil fungsi fetchKehadiranData saat komponen di-mount.
 * - Mengembalikan objek yang berisi data kehadiran dan error.
 */

export const useKehadiranData = (interval = 10000) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchKehadiranData();
        setData(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchData();
    
  }, []);

  return { data, error };
};