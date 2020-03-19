import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

import history from '~/services/history';
import Base from '../Base';
import api from '~/services/api';

export default function Edit({
  match: {
    params: { id },
  },
}) {
  const [deliveryMan, setDeliveryMan] = useState(null);

  const loadDeliveryMans = useCallback(async () => {
    const { data } = await api.get(`/deliverymans`, { params: { id } });

    if (data.length === 0) {
      toast.error('Entregador não encontrada');
      history.push('/delivery-mans');
      return;
    }

    setDeliveryMan({ ...data[0] });
  }, [id]);

  const handleSubmit = useCallback(
    async formData => {
      try {
        await api.put(`/deliverymans/${id}`, formData);
        toast.success('Entregador foi atualizado.');
        return true;
      } catch (err) {
        toast.error('Falho no servidor, informe ao administrador do sistema.');
        throw err;
      }
    },
    [id]
  );

  useEffect(() => {
    loadDeliveryMans();
  }, [loadDeliveryMans]);

  return (
    <> {deliveryMan && <Base onPress={handleSubmit} title="Ediçao de entregadores" defaultValue={deliveryMan} />} </>
  );
}

Edit.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
};

Edit.defaultProps = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: null,
    }),
  }),
};
