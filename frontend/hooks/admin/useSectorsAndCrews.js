import { useState, useEffect } from 'react';
import { fetchSectors, fetchCrews } from '../../services/teknisiService';

export const useSectorsAndCrews = () => {
    const [sectors, setSectors] = useState([]);
    const [crews, setCrews] = useState([]);
    const [sectorIdMap, setSectorIdMap] = useState({});
    const [crewIdMap, setCrewIdMap] = useState({});
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const sectorsData = await fetchSectors();
                const crewsData = await fetchCrews();

                const newSectorIdMap = {};
                sectorsData.forEach(sector => {
                    newSectorIdMap[sector.id] = sector.namaSektor;
                });

                const newCrewIdMap = {};
                crewsData.forEach(crew => {
                    newCrewIdMap[crew.kodeCrew] = crew.id;
                });

                setSectors(sectorsData);
                setCrews(crewsData);
                setSectorIdMap(newSectorIdMap);
                setCrewIdMap(newCrewIdMap);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchData();
    }, []);

    return { sectors, crews, sectorIdMap, crewIdMap, error };
};
