"use client"
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useKehadiranData } from '../../hooks/useKehadiranData';
import { daysInMonth, formatDate } from '../../utils/adminKehadiran/dateUtils'; // Impor formatDate di sini
import { generateColumnDefs } from '../../utils/adminKehadiran/columnUtils';
import { updateKehadiranData, deleteKehadiranData, updateCrewTeknisi } from '../../services/kehadiranService'; // Impor updateCrewTeknisi di sini

/**
 * Komponen TabelKehadiran
 * Menangani tampilan dan interaksi untuk pengelolaan data kehadiran teknisi.
 * 
 * - Menggunakan useState dan useEffect untuk mengelola dan memperbarui data kehadiran.
 * - Menggunakan AgGridReact untuk menampilkan data dalam format tabel yang dapat diedit.
 * - Menyediakan fungsi untuk memperbarui dan menghapus data kehadiran.
 * - Menampilkan notifikasi menggunakan toast untuk setiap tindakan yang berhasil atau gagal.
 */

function TabelKehadiran({ tabelKehadiran, selectedMonth = moment().format('YYYY-MM'), selectedSektor, selectedIdTeknisi }) {
  const { data, filteredData, crewOptions, crewData, error } = useKehadiranData(selectedMonth, selectedSektor, selectedIdTeknisi);
  const [colDefs, setColDefs] = useState([]);
  const [rowData, setRowData] = useState([]);

  useEffect(() => {
    if (error) {
      toast.error(`Error: ${error}`);
    }
  }, [error]);

  useEffect(() => {
    setRowData(filteredData);
  }, [filteredData]);

  useEffect(() => {
    const numberOfDays = daysInMonth(moment(selectedMonth).year(), moment(selectedMonth).month());
    const daysArray = Array.from({ length: numberOfDays }, (_, i) => i + 1);

    setColDefs(generateColumnDefs(crewOptions, daysArray, selectedMonth));
  }, [selectedMonth, selectedSektor, selectedIdTeknisi, crewOptions]);

  const onCellValueChanged = (params) => {
    const { data, colDef, newValue } = params;
    const field = colDef.field;
    const id = data.idTeknisi;

    if (field === "crew") {
      const selectedCrew = crewData.find(crew => crew.kodeCrew === newValue);
      const idCrew = selectedCrew ? selectedCrew.id : null;

      if (idCrew) {
        updateCrewTeknisi(id, idCrew)
          .then(() => toast.success('Crew updated successfully'))
          .catch(error => toast.error('Error updating crew'));
      } else {
        toast.error('Invalid crew selection');
      }
    } else {
      const day = field.replace('day', '');
      const date = formatDate(`${selectedMonth}-${day}`, 'YYYY-MM-DD');

      if (newValue === null || newValue === "") {
        deleteKehadiranData(id, date)
          .then(() => toast.success('Data kehadiran berhasil dihapus'))
          .catch(error => toast.error('Error deleting data'));
      } else {
        updateKehadiranData(id, date, 'status', newValue)
          .then(() => toast.success('Update successful'))
          .catch(error => toast.error('Error updating data'));
      }
    }
  };

  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <ToastContainer />
      <div className="ag-theme-quartz" style={{ height: 500 }}>
        <AgGridReact
          rowData={rowData}
          columnDefs={colDefs}
          defaultColDef={{ editable: true }}
          onCellValueChanged={onCellValueChanged}
          pagination
          paginationPageSize={15}
          paginationPageSizeSelector={[25, 50, 100]}
        />
      </div>
    </div>
  );
}

TabelKehadiran.propTypes = {
  tabelKehadiran: PropTypes.array.isRequired,
  selectedMonth: PropTypes.string,
  selectedSektor: PropTypes.string,
  selectedIdTeknisi: PropTypes.string
};

TabelKehadiran.defaultProps = {
  selectedMonth: moment().format('YYYY-MM')
};

export default TabelKehadiran;
