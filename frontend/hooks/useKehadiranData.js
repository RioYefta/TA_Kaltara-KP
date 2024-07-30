import { useState, useEffect } from 'react';
import { fetchKehadiranData, fetchCrewData } from '../services/kehadiranService';
import { sectorMapping } from '../utils/adminKehadiran/statusUtils';
import { toast } from 'react-toastify';
import moment from 'moment';

/**
 * Hook useKehadiranData
 * Mengambil dan mengelola data kehadiran teknisi.
 * 
 * - Menggunakan useState untuk menyimpan data kehadiran, crew data, dan error.
 * - Menggunakan useEffect untuk memanggil fungsi fetchKehadiranData dan fetchCrewData saat komponen di-mount.
 * - Mengelola pemfilteran data berdasarkan bulan, sektor, dan ID teknisi.
 * - Mengembalikan objek yang berisi data, filteredData, crewOptions, crewData, dan error.
 */

export const useKehadiranData = (selectedMonth, selectedSektor, selectedIdTeknisi) => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [crewData, setCrewData] = useState([]);
  const [crewOptions, setCrewOptions] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const kehadiranData = await fetchKehadiranData();
        setData(kehadiranData);
      } catch (err) {
        setError(err.message);
        toast.error(`Error: ${err.message}`);
      }
    };

    const fetchCrewOptions = async () => {
      try {
        const crewData = await fetchCrewData();
        setCrewData(crewData);
      } catch (err) {
        setError(err.message);
        toast.error(`Error: ${err.message}`);
      }
    };

    fetchData();
    fetchCrewOptions();
  }, []);

  useEffect(() => {
    if (selectedSektor) {
      const sectorNumber = sectorMapping[selectedSektor] || 0;
      const filteredOptions = crewData.filter(crew => crew.sektor === sectorNumber).map(crew => crew.kodeCrew);
      setCrewOptions(filteredOptions);
    } else {
      const allOptions = crewData.map(crew => crew.kodeCrew);
      setCrewOptions(allOptions);
    }
  }, [selectedSektor, crewData]);

  useEffect(() => {
    const selectedMonthMoment = moment(selectedMonth);
    const numberOfDays = selectedMonthMoment.daysInMonth();
    const daysArray = Array.from({ length: numberOfDays }, (_, i) => i + 1);

    const groupedData = data.reduce((acc, item) => {
      const key = `${item.idTeknisi}-${item.sektor}-${item.namaTeknisi}`;
      if (!acc[key]) {
        acc[key] = { ...item, days: {} };
      }
      if (moment(item.date).isSame(selectedMonthMoment, 'month')) {
        const day = moment(item.date).date();
        acc[key].days[day] = item.status;
      }
      return acc;
    }, {});

    const mappedData = Object.values(groupedData).map(item => {
      const newItem = { ...item };
      daysArray.forEach(day => {
        newItem[`day${day}`] = item.days[day] || '';
      });
      return newItem;
    });

    let filtered = mappedData;
    if (selectedSektor) {
      filtered = filtered.filter(item => item.sektor === selectedSektor);
    }
    if (selectedIdTeknisi) {
      filtered = filtered.filter(item => item.idTeknisi === selectedIdTeknisi);
    }

    setFilteredData(filtered);
  }, [selectedMonth, selectedSektor, selectedIdTeknisi, data, crewOptions]);

  return { data, filteredData, crewOptions, crewData, error };
};
