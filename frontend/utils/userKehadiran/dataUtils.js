import moment from 'moment';

/**
 * Fungsi processData
 * Mengolah data kehadiran teknisi berdasarkan bulan, sektor, dan ID teknisi yang dipilih.
 * 
 * - Mengelompokkan data berdasarkan ID teknisi, sektor, dan nama teknisi.
 * - Menghitung status kehadiran untuk setiap hari dalam bulan yang dipilih.
 * - Mengembalikan data yang telah difilter berdasarkan sektor dan ID teknisi.
 * 
 * @param {Array} data - Data kehadiran teknisi.
 * @param {string} selectedMonth - Bulan yang dipilih dalam format YYYY-MM.
 * @param {string} selectedSektor - Sektor yang dipilih.
 * @param {string} selectedIdTeknisi - ID teknisi yang dipilih.
 * @returns {Array} - Data yang telah diproses dan difilter.
 */
export const processData = (data, selectedMonth, selectedSektor, selectedIdTeknisi) => {
  const selectedMonthMoment = moment(selectedMonth);
  const numberOfDays = selectedMonthMoment.daysInMonth();
  const daysArray = Array.from({ length: numberOfDays }, (_, i) => i + 1);

  const groupedData = data.reduce((acc, item) => {
    const key = `${item.idTeknisi}-${item.sektor}-${item.namaTeknisi}`;
    if (!acc[key]) {
      acc[key] = {
        ...item,
        days: {}
      };
    }
    if (moment(item.date).isSame(selectedMonthMoment, 'month')) {
      const day = moment(item.date).date();
      acc[key].days[day] = item.status;
    }
    return acc;
  }, {});

  const mappedData = Object.values(groupedData).map(item => {
    const newItem = { ...item };
    daysArray.forEach(day => {
      newItem[`day${day}`] = item.days[day] || '';
    });
    return newItem;
  });

  return mappedData
    .filter(item => !selectedSektor || item.sektor === selectedSektor)
    .filter(item => !selectedIdTeknisi || item.idTeknisi === selectedIdTeknisi);
};