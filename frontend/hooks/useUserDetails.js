import { useState, useEffect } from 'react';
import { fetchUserData } from '../services/roleService';

export const useUserDetails = () => {
    const [userDetails, setUserDetails] = useState(null);

    useEffect(() => {
        fetchUserData(setUserDetails);
    }, []);

    return { userDetails };
};
