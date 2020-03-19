import { format, parseISO } from 'date-fns';

export function calcStep({ startDate, endDate }) {
  if (endDate) {
    return 2;
  }

  if (startDate) {
    return 1;
  }

  return 0;
}

export function formateDate(date) {
  return format(parseISO(date), 'dd/MM/yyyy');
}
