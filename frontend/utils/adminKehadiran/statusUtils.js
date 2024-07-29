export const sectorMapping = {
    'TARAKAN': 1,
    'TANJUNG SELOR': 2,
    'TANJUNG REDEB': 3,
    'MALINAU': 4,
    'NUNUKAN': 5,
    // Jika ada tambahan sektor disini, tambahkan juga di database SQL
  };
  
  export const statusMap = {
    'PAGI': 'P',
    'SIANG': 'S',
    'MALAM': 'M',
    'OFF': 'OFF',
    'IZIN': 'I',
    'CUTI': 'C',
    'SAKIT': 'SKT'
  };
  
  export const reverseStatusMap = {
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