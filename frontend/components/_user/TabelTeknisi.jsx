"use client";
import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { Search } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTeknisiData } from '../../hooks/useTeknisiData';
import { processTeknisiData } from '../../utils/userTeknisi/dataUtils';
import { generateTeknisiColDefs } from '../../utils/userTeknisi/columnUtils';

const pagination = true;
const paginationPageSize = 15;
const paginationPageSizeSelector = [25, 50, 100];

function TabelTeknisi() {
    const { data, error } = useTeknisiData();
    const [rowData, setRowData] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const colDefs = generateTeknisiColDefs();

    useEffect(() => {
        if (data) {
            setRowData(processTeknisiData(data, searchInput));
        }
    }, [data, searchInput]);

    if (error) {
        toast.error(`Error: ${error}`);
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <ToastContainer />
            <div className="ag-theme-quartz" style={{ height: 500 }}>
                <div className='p-2 rounded-lg border shadow-sm flex gap-2 mb-4 max-w-sm'>
                    <Search />
                    <input
                        type='text'
                        placeholder='Cari...'
                        className='outline-none w-full'
                        onChange={(event) => setSearchInput(event.target.value)}
                    />
                </div>
                <AgGridReact
                    rowData={rowData}
                    columnDefs={colDefs}
                    quickFilterText={searchInput}
                    pagination={pagination}
                    paginationPageSize={paginationPageSize}
                    paginationPageSizeSelector={paginationPageSizeSelector}
                />
            </div>
        </div>
    );
}

export default TabelTeknisi;
