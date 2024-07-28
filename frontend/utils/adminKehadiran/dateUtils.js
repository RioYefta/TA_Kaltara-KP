import moment from 'moment';

export const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();

export const formatDate = (date, format) => moment(date).format(format);
