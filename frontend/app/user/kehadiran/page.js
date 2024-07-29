"use client"
import React, { useState } from 'react'
import MonthSelection from '../../../components/MonthSelection'
import SektorSelect from '../../../components/SektorSelect'
import TabelKehadiran from '../../../components/_user/TabelKehadiran'
import StatusComponent from '@/components/status'
import { Button } from '@/components/ui/button'
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/firebase/config';
import { useRouter } from 'next/navigation';
import LoadingComponent from '../../../components/loadingPage/page';

function UserKehadiran({ tabelKehadiran: initialTabelKehadiran, selectedMonth: initialSelectedMonth, selectedSektor: initialSelectedSektor }) {

  const [selectedMonth, setSelectedMonth] = useState(initialSelectedMonth);
  const [selectedSektor, setSelectedSektor] = useState(''); // Initialize with an empty string
  const [selectedIdTeknisi, setSelectedIdTeknisi] = useState(''); // Initialize with an empty string
  const [tabelKehadiran, setTabelKehadiran] = useState(initialTabelKehadiran);
  const [searchParams, setSearchParams] = useState({ month: initialSelectedMonth, sektor: '', idTeknisi: '' });
  const [user, loading] = useAuthState(auth);
  const router = useRouter();

  if (loading) {
    return <LoadingComponent />;
  }

  if (!user) {
    return router.push('/');
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

export default UserKehadiran