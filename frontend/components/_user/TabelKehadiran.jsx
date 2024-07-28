"use client"
import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import moment from 'moment';
import { useKehadiranData } from '../../hooks/useKehadiranData';
import { processData } from '../../utils/userKehadiran/dataUtils';
import { generateColDefs } from '../../utils/userKehadiran/columnUtils';

const pagination = true;
const paginationPageSize = 15;
const paginationPageSizeSelector = [25, 50, 100];

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
          pagination={pagination}
          paginationPageSize={paginationPageSize}
          paginationPageSizeSelector={paginationPageSizeSelector}
        />
      </div>
    </div>
  );
}

export default TabelKehadiran;
