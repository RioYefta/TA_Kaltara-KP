import { API_ENDPOINTS } from '../config/apiConfig';
import axios from 'axios';

export const fetchSectors = async () => {
    try {
        const response = await fetch(API_ENDPOINTS.SEKTOR);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching sectors:', error);
        throw error;
    }
};

export const addCrew = async (data) => {
    try {
        const response = await fetch(API_ENDPOINTS.CREW, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Error adding crew:', error);
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

export const updateCrewTeknisi = async (idTeknisi, idCrew) => {
    try {
        const response = await axios.post(`${API_ENDPOINTS.TEKNISI}/updateCrewTeknisi`, {
            id: idTeknisi,
            crew: idCrew
        });
        return response.data;
    } catch (error) {
        console.error('Error updating crew:', error);
        throw error;
    }
};

