import moment from 'moment';

const statusMap = {
  'PAGI': 'P',
  'SIANG': 'S',
  'MALAM': 'M',
  'OFF': 'OFF',
  'IZIN': 'I',
  'CUTI': 'C',
  'SAKIT': 'SKT'
};

const reverseStatusMap = {
  'P': 'PAGI',
  'S': 'SIANG',
  'M': 'MALAM',
  'OFF': 'OFF',
  'I': 'IZIN',
  'C': 'CUTI',
  'SKT': 'SAKIT'
};

export const generateColDefs = (selectedMonth) => {
  const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const numberOfDays = daysInMonth(moment(selectedMonth).year(), moment(selectedMonth).month());
  const daysArrays = Array.from({ length: numberOfDays }, (_, i) => i + 1);

  return [
    { field: "sektor", pinned: 'left' },
    { field: "crew", pinned: 'left' },
    { field: "namaTeknisi", filter: true, pinned: 'left' },
    ...daysArrays.map(day => ({
      field: `day${day}`,
      headerName: `${day}`,
      width: 60,
      valueFormatter: params => statusMap[params.value] || params.value,
      valueParser: params => reverseStatusMap[params.newValue] || params.newValue,
    })),
    // New fields for status counts
    { 
      field: "PAGI", 
      headerName: "PAGI", 
      width: 70, 
      pinned: 'right', 
      valueGetter: params => params.data ? Object.values(params.data).filter(status => status === 'PAGI').length : 0 // Count PAGI
    },
    { 
      field: "SIANG", 
      headerName: "SIANG", 
      width: 75, 
      pinned: 'right', 
      valueGetter: params => params.data ? Object.values(params.data).filter(status => status === 'SIANG').length : 0 // Count SIANG
    },
    { 
      field: "MALAM", 
      headerName: "MALAM", 
      width: 85, 
      pinned: 'right', 
      valueGetter: params => params.data ? Object.values(params.data).filter(status => status === 'MALAM').length : 0 // Count MALAM
    },
    { 
      field: "OFF", 
      headerName: "OFF", 
      width: 65, 
      pinned: 'right', 
      valueGetter: params => params.data ? Object.values(params.data).filter(status => status === 'OFF').length : 0 // Count OFF
    },
    { 
      field: "TOTAL", 
      headerName: "TOTAL", 
      width: 75, 
      pinned: 'right', 
      valueGetter: params => params.data ? 
        Object.values(params.data).filter(status => ['PAGI', 'SIANG', 'MALAM'].includes(status)).length : 0 // Count total
    }
  ];
};
