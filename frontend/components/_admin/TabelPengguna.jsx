'use client'
import React, { useState, useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { Search } from "lucide-react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useUsers } from '../../hooks/admin/useUsers';
import { getUserColumnDefs } from '../../utils/adminPengguna/userColumn';

/**
 * Komponen TabelPengguna
 * Menangani tampilan dan interaksi untuk pengelolaan data pengguna.
 * 
 * - Menggunakan AgGridReact untuk menampilkan data pengguna dalam format tabel.
 * - Menyediakan fungsi pencarian untuk memfilter pengguna berdasarkan nama atau email.
 * - Menggunakan hook untuk mengelola data pengguna dan fungsi untuk menghapus atau memperbarui peran pengguna.
 */

function TabelPengguna() {
  const { users, setUsers, deleteUser, updateUserRole } = useUsers();
  const [searchInput, setSearchInput] = useState('');

  const filteredUsers = useMemo(() => {
    if (!searchInput) return users;
    return users.filter(user => 
      user.name.toLowerCase().includes(searchInput.toLowerCase()) ||
      user.email.toLowerCase().includes(searchInput.toLowerCase())
    );
  }, [users, searchInput]);

  const columnDefs = useMemo(() => getUserColumnDefs(deleteUser, updateUserRole), [deleteUser, updateUserRole]);

  return (
    <div>
      <ToastContainer />
      <div className="flex flex-col md:flex-row justify-between mb-4">
        <div className='p-2 rounded-lg border shadow-sm flex gap-2 max-w-full md:max-w-sm mb-4 md:mb-0'>
          <Search />
          <input 
            type='text' 
            placeholder='Cari...'
            className='outline-none w-full'
            onChange={(event) => setSearchInput(event.target.value)} 
          />
        </div>
      </div>
      <div className="ag-theme-quartz" style={{ height: 500 }}>
        <AgGridReact
          rowData={filteredUsers}
          columnDefs={columnDefs}
          rowSelection="multiple"
          suppressRowClickSelection={true}
          pagination={true}
          paginationPageSize={10}
          paginationPageSizeSelector={[10, 25, 50]}
        />
      </div>
    </div>
  );
}

export default TabelPengguna;