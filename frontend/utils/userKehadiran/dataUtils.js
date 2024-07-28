import moment from 'moment';

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
