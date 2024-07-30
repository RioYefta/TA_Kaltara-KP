"use client"
import { Button } from '@/components/ui/button'
import React, { useState } from 'react'
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
import { useSectors } from '../../hooks/admin/useSectors';
import { addCrew } from '../../services/crewService';

/**
 * Komponen TambahCrew
 * Menangani tampilan dan interaksi untuk menambahkan crew baru.
 * 
 * - Menggunakan useState untuk mengelola status dialog.
 * - Menggunakan useForm untuk mengelola input form dan validasi.
 * - Menampilkan dialog untuk menambahkan crew dengan informasi sektor.
 * - Menyediakan fungsi untuk menambahkan crew melalui form.
 * - Menampilkan notifikasi menggunakan toast untuk setiap tindakan yang berhasil atau gagal.
 */

function TambahCrew() {
    const [open, setOpen] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const { sectors, error: sectorError } = useSectors();

    const onSubmit = async (data) => {
        setOpen(false);
        try {
            const result = await addCrew(data);
            toast.success("Crew berhasil ditambahkan!");
        } catch (error) {
            toast.error("Terjadi kesalahan saat menambahkan crew.");
        }
    }

    if (sectorError) {
        toast.error(`Error fetching sectors: ${sectorError}`);
    }

    return (
        <div className='flex flex-col gap-4 p-2'>
            <ToastContainer />
            <div className='flex flex-col md:flex-row justify-between mb-1'>
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                        <Button onClick={() => setOpen(true)}>Tambah Crew</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Tambah Crew</DialogTitle>
                            <DialogDescription>
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <div className='py-2'>
                                        <label>Sektor</label>
                                        <select className='p-3 border rounded-lg'
                                            {...register('sektor', { required: true })}>
                                            {sectors.map(sector => (
                                                <option key={sector.id} value={sector.id}>{sector.namaSektor}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className='py-2'>
                                        <label>Nama Crew</label>
                                        <Input placeholder='Cth. A1ABC1'
                                            {...register('kodeCrew', { required: "*Isi Nama" })}
                                        />
                                        {errors.kodeCrew && <p className="text-red-500">{errors.kodeCrew.message}</p>}
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
        </div>
    )
}

export default TambahCrew;
