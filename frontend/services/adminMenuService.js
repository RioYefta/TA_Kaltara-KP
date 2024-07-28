import { House, Users, CogIcon } from 'lucide-react';

export const menuList = [
    {
        id: 1,
        name: 'Jadwal Teknisi',
        icon: House,
        path: '/admin/kehadiran'
    },
    {
        id: 2,
        name: 'Teknisi',
        icon: Users,
        path: '/admin/teknisi'
    },
    {
        id: 3,
        name: 'Pengguna',
        icon: CogIcon,
        path: '/admin/pengguna'
    }
];
