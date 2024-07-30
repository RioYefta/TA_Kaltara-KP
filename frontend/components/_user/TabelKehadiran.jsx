"use client"
import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import moment from 'moment';
import { useKehadiranData } from '../../hooks/useKehadiranData';
import { processData } from '../../utils/userKehadiran/dataUtils';
import { generateColDefs } from '../../utils/userKehadiran/columnUtils';

/**
 * Komponen TabelKehadiran
 * Menangani tampilan dan interaksi untuk pengelolaan data kehadiran pengguna.
 * 
 * - Menggunakan useState dan useEffect untuk mengelola dan memperbarui data kehadiran.
 * - Menggunakan AgGridReact untuk menampilkan data dalam format tabel yang dapat diedit.
 * - Menyediakan fungsi untuk memfilter data berdasarkan bulan, sektor, dan ID teknisi.
 * - Menampilkan data kehadiran dengan notifikasi untuk setiap tindakan yang berhasil atau gagal.
 */

function TabelKehadiran({ selectedMonth = moment().format('YYYY-MM'), selectedSektor, selectedIdTeknisi }) {
  const { data, error } = useKehadiranData();
  const [filteredData, setFilteredData] = useState([]);
  const [colDefs, setColDefs] = useState(generateColDefs(selectedMonth));
  const [rowData, setRowData] = useState([]);

  useEffect(() => {
    setColDefs(generateColDefs(selectedMonth));
  }, [selectedMonth]);

  useEffect(() => {
    const processedData = processData(data, selectedMonth, selectedSektor, selectedIdTeknisi);
    setFilteredData(processedData);
  }, [data, selectedMonth, selectedSektor, selectedIdTeknisi]);

  useEffect(() => {
    setRowData(filteredData);
  }, [filteredData]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <div className="ag-theme-quartz" style={{ height: 500 }}>
        <AgGridReact
          rowData={rowData}
          columnDefs={colDefs}
          defaultColDef={{ editable: false }}
          pagination
          paginationPageSize = {15}
          paginationPageSizeSelector = {[25, 50, 100]}
        />
      </div>
    </div>
  );
}

export default TabelKehadiran;
