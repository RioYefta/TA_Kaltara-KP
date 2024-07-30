"use client"
import React, { useEffect, useState } from 'react'
import { fetchSektor } from '../services/sektorService'; // Import the fetchSektor function

/**
 * Komponen SektorSelect
 * Menangani tampilan dan interaksi untuk pemilihan sektor.
 * 
 * - Menggunakan useEffect untuk mengambil data sektor dari API.
 * - Mengelola status sektor dengan useState.
 * - Menyediakan dropdown untuk memilih sektor dan mengirimkan nilai yang dipilih ke parent component.
 */

function SektorSelect({ selectedSektor }) { // Destructure selectedSektor from props
  const [sektor, setSektor] = useState([]);

  useEffect(() => {
    const getSektorData = async () => {
      try {
        const sektorNames = await fetchSektor();
        setSektor(sektorNames);
      } catch (error) {
        console.error('Error fetching sectors:', error);
      }
    };

    getSektorData();
  }, []);

  return (
    <div className="w-full md:w-auto">
      <select className='p-2 border rounded-lg w-full md:w-auto'
        onChange={(e) => selectedSektor(e.target.value)}
        defaultValue=""
      >
        <option value="">Semua</option> {/* Option for all sectors */}
        {sektor.map((namaSektor, index) => (
          <option key={index} value={namaSektor}>{namaSektor}</option>
        ))}
      </select>
    </div>
  )
}

export default SektorSelect;
