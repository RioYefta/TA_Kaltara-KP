import React from 'react';
import { statusColors } from '../utils/adminKehadiran/statusUtils'; // Pastikan untuk mengimpor statusColors

/**
 * Komponen StatusComponent
 * Menampilkan status kehadiran dengan warna yang sesuai.
 * 
 * - Menggunakan statusColors untuk menentukan warna berdasarkan status.
 * - Menampilkan inisial dan deskripsi status kehadiran.
 */

const statusInitials = {
    'PAGI': 'P',
    'SIANG': 'S',
    'MALAM': 'M',
    'OFF': 'OFF',
    'IZIN': 'I',
    'CUTI': 'C',
    'SAKIT': 'SKT'
};

const StatusComponent = () => {
    return (
        <div>
            {Object.keys(statusInitials).map(status => (
                <div key={status} style={{ display: 'flex', alignItems: 'center', margin: '5px' }}>
                    <div style={{ width: '20px', height: '20px', backgroundColor: statusColors[status], marginRight: '10px' }} />
                    <span>{`${statusInitials[status]} - ${status}`}</span>
                </div>
            ))}
        </div>
    );
};

export default StatusComponent;
