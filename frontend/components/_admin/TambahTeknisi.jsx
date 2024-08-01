"use client"
import { Button } from '@/components/ui/button'
import React, { useState, useRef } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSectorsAndCrews } from '../../hooks/admin/useSectorsAndCrews';
import { addTeknisi } from '../../services/teknisiService';
import { handleFileUpload, handleFileSubmit } from '../../utils/adminTeknisi/fileUtils';

function TambahTeknisi() {
    const [open, setOpen] = useState(false);
    const [fileData, setFileData] = useState(null);
    const fileInputRef = useRef(null);
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();
    const { sectors, crews, sectorIdMap, crewIdMap, error } = useSectorsAndCrews();
    const selectedSector = watch('sektor');

    const filteredCrews = selectedSector
        ? crews.filter(crew => crew.sektor === parseInt(selectedSector))
        : crews;

    const onSubmit = async (data, showToast = true, fromFileUpload = false) => {
        const { crew, ...rest } = data;
        if (!crew && !fromFileUpload) {
            toast.error("Crew harus dipilih.");
            return;
        }
        const idCrew = crewIdMap[crew] || data.idCrew;
        const payload = { ...rest, idCrew };
        setOpen(false);
        try {
            const result = await addTeknisi(payload);
            if (showToast) {
                toast.success("Teknisi berhasil ditambahkan!");
            }
        } catch (error) {
            if (showToast) {
                toast.error("Terjadi kesalahan saat menambahkan teknisi.");
            }
        }
    };

    if (error) {
        toast.error(`Error fetching sectors or crews: ${error}`);
    }

    const sectorNameMap = sectors.reduce((map, sector) => {
        map[sector.namaSektor] = sector.id;
        return map;
    }, {});

    return (
        <div className='flex flex-col gap-4 p-2'>
            <ToastContainer />
            <div className='flex flex-col md:flex-row justify-between mb-1'>
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                        <Button onClick={() => setOpen(true)}>Tambah Teknisi</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Tambah Teknisi</DialogTitle>
                            <DialogDescription>
                                <form onSubmit={handleSubmit((data) => onSubmit(data, true))}>
                                    <div className='py-2'>
                                        <label>Nama Teknisi</label>
                                        <Input placeholder='Cth. Rio Manullang'
                                            {...register('nama', { required: "*Isi Nama" })}
                                        />
                                        {errors.nama && <p className="text-red-500">{errors.nama.message}</p>}
                                    </div>
                                    <div className='flex flex-col py-2'>
                                        <label>Sektor</label>
                                        <select className='p-3 border rounded-lg'
                                            {...register('sektor', { required: true })}>
                                            <option value="">Pilih Sektor</option>
                                            {sectors.map(sector => (
                                                <option key={sector.id} value={sector.id}>{sector.namaSektor}</option>
                                            ))}
                                        </select>
                                        {errors.sektor && <p className="text-red-500">*Pilih Sektor</p>}
                                    </div>
                                    <div className='flex flex-col py-2'>
                                        <label>Crew</label>
                                        <select className='p-3 border rounded-lg'
                                            {...register('crew', { required: true })}>
                                            <option value="">Pilih Crew</option>
                                            {filteredCrews.map(crew => (
                                                <option key={crew.id} value={crew.kodeCrew}>{crew.kodeCrew}</option>
                                            ))}
                                        </select>
                                        {errors.crew && <p className="text-red-500">*Pilih Crew</p>}
                                    </div>
                                    <div className='flex gap-3 items-center justify-end mt-5'>
                                        <Button onClick={() => setOpen(false)} variant="ghost">Batal</Button>
                                        <Button type="submit">Simpan</Button>
                                    </div>
                                </form>
                            </DialogDescription>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>
            </div>
            <div className='flex flex-col md:flex-row justify-between border rounded-lg shadow-sm p-2'>
                <div className='flex flex-col'>
                    <input
                        type="file"
                        id='csvFileSelector'
                        accept=".csv, .xls, .xlsx"
                        className="p-1 text-sm border border-2 border-gray-3000 rounded-lg mb-2"
                        onChange={(event) => handleFileUpload(event, setFileData)}
                        ref={fileInputRef}
                    />
                    <label htmlFor='csvFileSelector' className="text-xs font-light text-gray-700">
                        Pilih File (*csv, xls, xlsx)
                    </label>
                </div>
                <Button className="md:mt-0 mt-2 md:ml-4" onClick={() => handleFileSubmit(fileData, crewIdMap, onSubmit, setFileData, fileInputRef, sectorNameMap)}>Submit</Button>
            </div>
        </div>
    );
}

export default TambahTeknisi;
``
