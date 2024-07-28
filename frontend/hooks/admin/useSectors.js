import { useState, useEffect } from 'react';
import { fetchSectors } from '../../services/crewService';

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
