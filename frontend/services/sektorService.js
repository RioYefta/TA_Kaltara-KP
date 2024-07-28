import { API_ENDPOINTS } from '../config/apiConfig';

export const fetchSektor = async () => {
    try {
        const response = await fetch(API_ENDPOINTS.SEKTOR);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data.map(item => item.namaSektor);
    } catch (error) {
        console.error('Error fetching sectors:', error);
        throw error;
    }
};
