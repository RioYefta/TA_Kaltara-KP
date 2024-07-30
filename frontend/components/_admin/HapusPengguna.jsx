// components/_admin/CustomButtons.jsx
import React from 'react';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";

// components/_admin/HapusPengguna.jsx
/**
 * Komponen CustomButtons
 * Menyediakan tombol untuk menghapus pengguna dengan konfirmasi.
 * 
 * - Menggunakan AlertDialog untuk konfirmasi penghapusan.
 * - Menampilkan tombol untuk menghapus pengguna dan mengonfirmasi tindakan tersebut.
 * - Mengambil data pengguna dan fungsi untuk menghapus atau memperbarui peran pengguna.
 */

export const CustomButtons = ({ data, onDeleteUser, onUpdateUserRole }) => {
  const { id, role } = data;

  return (
    <div className="flex gap-2">
      <AlertDialog>
        <AlertDialogTrigger>
          <Button size="sm" variant="destructive">
            <Trash />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Apakah Anda benar-benar yakin?</AlertDialogTitle>
            <AlertDialogDescription>
              Tindakan ini tidak bisa dibatalkan. Ini akan menghapus pengguna secara permanen.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Batal</AlertDialogCancel>
            <AlertDialogAction onClick={() => onDeleteUser(id)}>Hapus</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};