import { useState, useEffect } from 'react';
import { fetchTeknisiData } from '../services/teknisiService';

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
