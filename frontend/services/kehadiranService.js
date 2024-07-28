import axios from 'axios';
import { API_ENDPOINTS } from '../config/apiConfig';

export const fetchKehadiranData = async () => {
    try {
        const response = await fetch(API_ENDPOINTS.KEHADIRAN);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching attendance data:', error);
        throw error;
    }
};

export const fetchCrewData = async () => {
    try {
        const response = await fetch(API_ENDPOINTS.CREW);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching crew data:', error);
        throw error;
    }
};

export const updateKehadiranData = async (idTeknisi, date, field, newValue) => {
    try {
        await axios.post(API_ENDPOINTS.KEHADIRAN, {
            idTeknisi, date, field, newValue
        });
    } catch (error) {
        console.error('Error updating attendance data:', error);
        throw error;
    }
};
