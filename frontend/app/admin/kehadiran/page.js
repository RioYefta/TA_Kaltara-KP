"use client"
import React, { useState, useEffect } from 'react'
import MonthSelection from '../../../components/MonthSelection'
import SektorSelect from '../../../components/SektorSelect'
import TabelKehadiran from '../../../components/_admin/TabelKehadiran'
import StatusComponent from '@/components/status'
import { Button } from '@/components/ui/button'
import { useAdminValidation } from '../../../hooks/useAdminValidation'; // Import the custom hook
import LoadingComponent from '../../../components/loadingPage/page';

function AdminKehadiran({ tabelKehadiran: initialTabelKehadiran, selectedMonth: initialSelectedMonth, selectedSektor: initialSelectedSektor }) {

  const [selectedMonth, setSelectedMonth] = useState(initialSelectedMonth);
  const [selectedSektor, setSelectedSektor] = useState(''); // Initialize with an empty string
  const [selectedIdTeknisi, setSelectedIdTeknisi] = useState(''); // Initialize with an empty string
  const [tabelKehadiran, setTabelKehadiran] = useState(initialTabelKehadiran);
  const [searchParams, setSearchParams] = useState({ month: initialSelectedMonth, sektor: '', idTeknisi: '' });
  const { loading, user, userRole } = useAdminValidation(); // Use the custom hook

  if (loading) {
    return <LoadingComponent />;
  }

  if (!user) {
    return null; // Redirect handled in the hook
  }

  if (userRole !== 'admin') {
    return null; // Redirect handled in the hook
  }

  const handleSearch = () => {
    setSearchParams({ month: selectedMonth, sektor: selectedSektor, idTeknisi: selectedIdTeknisi });
  };

  return (
    <div className='p-7'>
        <h2 className='font-bold text-2xl flex justify-between items-center'>Kehadiran</h2>
        <div className='flex flex-col md:flex-row gap-4 p-3 border rounded-lg shadow-sm'>
          <div className='flex gap-2 items-center w-full md:w-auto'>
            <label>Pilih Bulan:</label>
            <MonthSelection selectedMonth={(value) => setSelectedMonth(value)} />
          </div>
          <div className='flex gap-2 items-center w-full md:w-auto'>
            <label>Pilih Sektor:</label>
            <SektorSelect selectedSektor={(value) => setSelectedSektor(value)} />
          </div>
          <Button onClick={handleSearch} className="w-full md:w-auto">Search</Button>
        </div>
        
        <div className='mt-4'>
          <TabelKehadiran tabelKehadiran={tabelKehadiran}
            selectedMonth={searchParams.month}
            selectedSektor={searchParams.sektor}
            selectedIdTeknisi={searchParams.idTeknisi} />
        </div>
        <div> 
          <StatusComponent/> 
        </div>
    </div>
  )
  
}

export default AdminKehadiran