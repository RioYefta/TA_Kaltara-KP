import { API_ENDPOINTS } from '../config/apiConfig';
import axios from 'axios';

export const fetchTeknisiData = async () => {
    try {
        const response = await fetch(API_ENDPOINTS.TEKNISI);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching teknisi data:', error);
        throw error;
    }
};

export const deleteTeknisi = async (id) => {
    try {
        await axios.delete(`${API_ENDPOINTS.TEKNISI}/${id}`);
    } catch (error) {
        console.error('Error deleting teknisi:', error);
        throw error;
    }
};

export const fetchCrews = async () => {
    try {
        const response = await fetch(API_ENDPOINTS.CREW);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching crews:', error);
        throw error;
    }
};

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

export const addTeknisi = async (data) => {
    try {
        const response = await fetch(API_ENDPOINTS.TEKNISI, {
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
        console.error('Error adding teknisi:', error);
        throw error;
    }
};

export const updateNamaTeknisi = async (id, nama) => {
    try {
        const response = await axios.put(`${API_ENDPOINTS.TEKNISI}/${id}`, { nama });
        return response.data;
    } catch (error) {
        console.error('Error updating nama teknisi:', error);
        throw error;
    }
};
