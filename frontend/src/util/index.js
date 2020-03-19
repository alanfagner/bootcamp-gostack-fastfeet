import { format } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';

const { format: currency } = new Intl.NumberFormat('pt', {
  style: 'currency',
  currency: 'BRL',
});

export function currencyFormat(value) {
  return currency(value);
}

export function dateFormat(value, fomartString = 'dd/MM/yyyy') {
  return format(value, fomartString, { locale: pt });
}

export function createSigla(name) {
  if (name) {
    const [first, second] = name.split(' ');
    return `${first.slice(0, 1)}${second && second.slice(0, 1)}`;
  }
  return null;
}

export function createStatus({ canceledAt, startDate, endDate }) {
  if (canceledAt) {
    return 'Cancelada';
  }
  if (endDate) {
    return 'Entregue';
  }
  if (startDate) {
    return 'Retirada';
  }
  return 'Pendente';
}
