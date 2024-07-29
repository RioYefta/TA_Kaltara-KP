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

export const statusColors = {
  'PAGI': '#ADFF2F',  // Gold
  'SIANG': '#ADFF2F', // Green Yellow
  'MALAM': '#1E90FF', // Dodger Blue
  'OFF': '#D3D3D3',   // Light Gray
  'IZIN': '#FFA500',  // Orange
  'CUTI': '#FF4500',  // Orange Red
  'SAKIT': '#FF0000'  // Red
};

export const generateColDefs = (selectedMonth) => {
  const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const numberOfDays = daysInMonth(moment(selectedMonth).year(), moment(selectedMonth).month());
  const daysArrays = Array.from({ length: numberOfDays }, (_, i) => i + 1);
  const today = moment().date();
  const isCurrentMonth = moment().isSame(selectedMonth, 'month');

  return [
    { field: "sektor", width: 150, pinned: 'left' },
    { field: "crew", width: 100, pinned: 'left' },
    { field: "namaTeknisi", filter: true, pinned: 'left' },
    ...daysArrays.map(day => ({
      field: `day${day}`,
      headerName: `${day}`,
      width: 60,
      valueFormatter: params => statusMap[params.value] || params.value,
      valueParser: params => reverseStatusMap[params.newValue] || params.newValue,
      cellStyle: params => ({
        backgroundColor: isCurrentMonth && day === today ? '#ffff99' : statusColors[params.value] || null
      }),
    })),
    // New fields for status counts
    { 
      field: "PAGI", 
      headerName: "PAGI", 
      width: 70, 
      pinned: 'right', 
      valueGetter: params => {
        const dayKeys = Object.keys(params.data).filter(key => key.startsWith('day'));
        const pagiCount = dayKeys.map(key => params.data[key]).filter(status => status === 'PAGI').length;
        console.log("PAGI count:", pagiCount); // Logging hasil perhitungan
        return pagiCount;
      }
    },
    { 
      field: "SIANG", 
      headerName: "SIANG", 
      width: 75, 
      pinned: 'right', 
      valueGetter: params => {
        const dayKeys = Object.keys(params.data).filter(key => key.startsWith('day'));
        const siangCount = dayKeys.map(key => params.data[key]).filter(status => status === 'SIANG').length;
        console.log("SIANG count:", siangCount); // Logging hasil perhitungan
        return siangCount;
      }
    },
    { 
      field: "MALAM", 
      headerName: "MALAM", 
      width: 85, 
      pinned: 'right', 
      valueGetter: params => {
        const dayKeys = Object.keys(params.data).filter(key => key.startsWith('day'));
        const malamCount = dayKeys.map(key => params.data[key]).filter(status => status === 'MALAM').length;
        console.log("MALAM count:", malamCount); // Logging hasil perhitungan
        return malamCount;
      } 
    },
    { 
      field: "OFF", 
      headerName: "OFF", 
      width: 65, 
      pinned: 'right', 
      valueGetter: params => {
        const dayKeys = Object.keys(params.data).filter(key => key.startsWith('day'));
        const offCount = dayKeys.map(key => params.data[key]).filter(status => status === 'OFF').length;
        console.log("OFF count:", offCount); // Logging hasil perhitungan
        return offCount;
      }
    },
    { 
      field: "TOTAL", 
      headerName: "TOTAL", 
      width: 75, 
      pinned: 'right', 
      valueGetter: params => {
        const dayKeys = Object.keys(params.data).filter(key => key.startsWith('day'));
        const totalCount = dayKeys.map(key => params.data[key]).filter(status => ['PAGI', 'SIANG', 'MALAM'].includes(status)).length;
        console.log("TOTAL count:", totalCount); // Logging hasil perhitungan
        return totalCount;
      } 
    }
  ];
};
