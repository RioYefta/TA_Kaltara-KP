import { useState, useEffect } from 'react';
import { fetchKehadiranData } from '../services/kehadiranService';

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