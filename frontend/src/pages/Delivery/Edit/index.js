import React, { useEffect, useCallback, useState } from 'react';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

import Base from '../Base';
import history from '~/services/history';
import api from '~/services/api';

export default function Edit({
  match: {
    params: { id },
  },
}) {
  const [delivery, setDelivery] = useState(null);

  const loadDelivery = useCallback(async () => {
    if (id) {
      const { data } = await api.get('/deliveries', { params: { id } });

      if (data.length === 0) {
        toast.error('Entrega não encontrada');
        history.push('/deliveries');
        return;
      }

      setDelivery({
        product: data[0].product,
        recipient: {
          label: data[0].recipient.name,
          value: data[0].recipient.id,
        },
        deliveryMan: {
          label: data[0].deliveryMan.name,
          value: data[0].deliveryMan.id,
        },
      });
    }
  }, [id]);

  const handleSubmit = useCallback(
    async ({ recipientId, deliveryManId, product }) => {
      try {
        await api.put(`/deliveries/${id}`, { recipientId, deliveryManId, product });
        toast.success('Entrega foi atualizada.');
      } catch (err) {
        toast.error('Falho no servidor, informe ao administrador do sistema.');
        throw err;
      }
    },
    [id]
  );

  useEffect(() => {
    loadDelivery();
  }, [loadDelivery]);

  return <>{delivery && <Base onPress={handleSubmit} title="Ediçao de ecomendas" defaultValues={delivery} />}</>;
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
