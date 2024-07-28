"use client";
import React, { useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTeknisiData } from '../../hooks/useTeknisiData';
import { deleteTeknisi } from '../../services/teknisiService';
import { generateTeknisiColumnDefs } from '../../utils/adminTeknisi/columnUtils';

const pagination = true;
const paginationPageSize = 15;
const paginationPageSizeSelector = [25, 50, 100];

function TabelTeknisi() {
  const { data, error } = useTeknisiData();
  const [selectedIds, setSelectedIds] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [colDefs, setColDefs] = useState(generateTeknisiColumnDefs());
  const [rowData, setRowData] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    if (error) {
      toast.error(`Error: ${error}`);
    }
  }, [error]);

  useEffect(() => {
    setRowData(data);
  }, [data]);

  const deleteSelectedRecords = async () => {
    try {
      await Promise.all(selectedIds.map(id => deleteTeknisi(id)));
      setRowData(prevData => prevData.filter(item => !selectedIds.includes(item.id)));
      setSelectedIds([]);
      toast.success('Teknisi berhasil dihapus!');
    } catch (error) {
      toast.error('Gagal menghapus teknisi');
    }
    setIsDialogOpen(false);
  };

  const onSelectionChanged = (event) => {
    const selectedNodes = event.api.getSelectedNodes();
    const selectedIds = selectedNodes.map(node => node.data.id);
    setSelectedIds(selectedIds);
  };

  return (
    <div>
      <ToastContainer />
      <div className="flex flex-col md:flex-row justify-between mb-4">
        <div className='p-2 rounded-lg border shadow-sm flex gap-2 max-w-full md:max-w-sm mb-4 md:mb-0'>
          <Search />
          <input type='text' placeholder='Cari...'
            className='outline-none w-full'
            onChange={(event) => setSearchInput(event.target.value)} />
        </div>
        <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <AlertDialogTrigger asChild>
            <Button size="sm" variant="destructive" disabled={selectedIds.length === 0}>
              Hapus yang dipilih
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Apakah Anda benar-benar yakin?</AlertDialogTitle>
              <AlertDialogDescription>
                Tindakan ini tidak bisa dibatalkan. Ini akan menghapus semua data teknisi yang dipilih secara permanen.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Batal</AlertDialogCancel>
              <AlertDialogAction onClick={deleteSelectedRecords}>Hapus</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
      <div
        className="ag-theme-quartz"
        style={{ height: 500 }}
      >
        <AgGridReact
          rowData={rowData}
          columnDefs={colDefs}
          quickFilterText={searchInput}
          pagination={pagination}
          paginationPageSize={paginationPageSize}
          paginationPageSizeSelector={paginationPageSizeSelector}
          rowSelection="multiple"
          onSelectionChanged={onSelectionChanged}
        />
      </div>
    </div>
  );
}

export default TabelTeknisi;