import { updateKehadiranData } from '../../services/kehadiranService';
import { statusMap, reverseStatusMap } from './statusUtils';
import { formatDate } from './dateUtils';
import { toast } from 'react-toastify';
import moment from 'moment';

export const generateColumnDefs = (crewOptions, daysArray, selectedMonth) => {
  const today = moment().date();
  const isCurrentMonth = moment().isSame(selectedMonth, 'month');

  return [
    { field: "idTeknisi", headerName: "ID", editable: false, width: 60, pinned: 'left' },
    { field: "sektor", editable: false, width: 150, pinned: 'left' },
    {
      field: "crew",
      editable: true,
      width: 100,
      cellEditor: 'agSelectCellEditor',
      cellEditorParams: { values: crewOptions },
      pinned: 'left',
      cellRendererFramework: params => (
        <div style={{ border: '1px solid #000', padding: '2px', borderRadius: '4px', position: 'relative' }}>
          <select
            value={params.value || ""}
            onChange={e => {
              const newValue = e.target.value || null;
              params.node.setDataValue(params.colDef.field, newValue);
              updateKehadiranData(params.data.idTeknisi, null, 'crew', newValue)
                .then(() => toast.success('Update successful'))
                .catch(error => toast.error('Error updating crew'));
            }}
            style={{ width: '100%', border: 'none', appearance: 'none', background: 'transparent' }}
          >
            {crewOptions.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
          <div style={{ position: 'absolute', right: '5px', top: '50%', transform: 'translateY(-50%)' }}>▼</div>
        </div>
      )
    },
    { field: "namaTeknisi", editable: false, filter: true, pinned: 'left' },
    ...daysArray.map(day => ({
      field: `day${day}`,
      headerName: `${day}`,
      width: 60,
      editable: true,
      cellEditor: 'agSelectCellEditor',
      cellEditorParams: { values: ["", ...Object.keys(statusMap)] },
      valueFormatter: params => statusMap[params.value] || params.value,
      valueParser: params => reverseStatusMap[params.newValue] || params.newValue,
      cellStyle: isCurrentMonth && day === today ? { backgroundColor: '#ffff99' } : null, // Highlight today
      cellRendererFramework: params => (
        <div style={{ border: '1px solid #000', padding: '2px', borderRadius: '4px', position: 'relative' }}>
          <select
            value={params.value || ""}
            onChange={e => {
              const newValue = e.target.value || null;
              params.node.setDataValue(params.colDef.field, newValue);
              const date = formatDate(`${selectedMonth}-${day}`, 'YYYY-MM-DD');
              updateKehadiranData(params.data.idTeknisi, date, 'status', newValue)
                .then(() => toast.success('Update successful'))
                .catch(error => toast.error('Error updating status'));
            }}
            style={{ width: '100%', border: 'none', appearance: 'none', background: 'transparent' }}
          >
            <option value="">--</option>
            {Object.keys(statusMap).map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
          <div style={{ position: 'absolute', right: '5px', top: '50%', transform: 'translateY(-50%)' }}>▼</div>
        </div>
      )
    })),
    { field: "PAGI", headerName: "PAGI", width: 70, pinned: 'right', valueGetter: params => params.data ? Object.values(params.data).filter(status => status === 'PAGI').length : 0 },
    { field: "SIANG", headerName: "SIANG", width: 75, pinned: 'right', valueGetter: params => params.data ? Object.values(params.data).filter(status => status === 'SIANG').length : 0 },
    { field: "MALAM", headerName: "MALAM", width: 85, pinned: 'right', valueGetter: params => params.data ? Object.values(params.data).filter(status => status === 'MALAM').length : 0 },
    { field: "OFF", headerName: "OFF", width: 65, pinned: 'right', valueGetter: params => params.data ? Object.values(params.data).filter(status => status === 'OFF').length : 0 },
    { field: "TOTAL", headerName: "TOTAL", width: 75, pinned: 'right', valueGetter: params => params.data ? Object.values(params.data).filter(status => ['PAGI', 'SIANG', 'MALAM'].includes(status)).length : 0 }
  ];
};