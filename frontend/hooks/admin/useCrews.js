import { useState, useEffect } from 'react';
import { fetchCrews } from '../../services/teknisiService';

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
