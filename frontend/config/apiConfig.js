const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const API_ENDPOINTS = {
    SEKTOR: `${API_BASE_URL}/sektor`,
    CREW: `${API_BASE_URL}/crew`,
    KEHADIRAN: `${API_BASE_URL}/admin-kehadiran`,
    TEKNISI: `${API_BASE_URL}/teknisi`
};
