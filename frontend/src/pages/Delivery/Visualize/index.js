import React from 'react';
import { format, parseISO } from 'date-fns';
import PropTypes from 'prop-types';

import { baseURL } from '~/services/api';
import { Container } from './styles';
import { Button } from '~/components/Form';

export default function Visualize({ delivery, onClose }) {
  const {
    startDate,
    endDate,
    recipient: { city, zipCode, state, address, number },
  } = delivery;

  return (
    <Container>
      <div className="content">
        <strong>Informacao da encomenda</strong>
        <span>
          {address}, {number}
        </span>
        <span>
          {city}, {state}
        </span>
        <span>{zipCode}</span>
        <div className="divider" />
        <strong>Datas</strong>
        <span>
          <strong>Retirada: </strong>
          <span>{startDate && format(parseISO(startDate), 'dd/MM/yyyy')}</span>
        </span>
        <span>
          <strong>Entrega: </strong>
          <span>{endDate && format(parseISO(endDate), 'dd/MM/yyyy')}</span>
        </span>
        <div className="divider" />
        <strong>Assinatura do destinaratio</strong>
        {delivery.signature && <img src={`${baseURL}/${delivery.signature.url}`} alt="Logo" />}

        <Button type="button" onClick={onClose}>
          Fechar
        </Button>
      </div>
    </Container>
  );
}

Visualize.propTypes = {
  delivery: PropTypes.shape({
    startDate: PropTypes.objectOf(Date),
    endDate: PropTypes.objectOf(Date),
    signature: PropTypes.objectOf({ url: PropTypes.string }),
    recipient: PropTypes.shape({
      city: PropTypes.string,
      zipCode: PropTypes.number,
      state: PropTypes.string,
      address: PropTypes.string,
      number: PropTypes.number,
    }),
  }).isRequired,
  onClose: PropTypes.func.isRequired,
};
