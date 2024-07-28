import { CustomButtons } from '../../components/_admin/HapusPengguna';

export const getUserColumnDefs = (onDeleteUser, onUpdateUserRole) => [
  { field: 'name' },
  { field: 'email' },
  {
    field: 'role',
    editable: true,
    cellEditor: 'agSelectCellEditor',
    cellEditorParams: {
      values: ['user', 'admin'],
    },
    onCellValueChanged: (params) => {
      const { id, role } = params.data;
      onUpdateUserRole(id, role);
    },
  },
  { 
    field: 'action', 
    cellRenderer: CustomButtons,
    cellRendererParams: {
      onDeleteUser,
    },
  },
];