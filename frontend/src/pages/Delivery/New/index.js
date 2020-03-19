import React, { useCallback } from 'react';
import { toast } from 'react-toastify';

import api from '~/services/api';
import Base from '../Base';

export default function New() {
  const handleSubmit = useCallback(async ({ recipientId, deliveryManId, product }) => {
    try {
      await api.post(`/deliveries`, { recipientId, deliveryManId, product });
      toast.success('Entregador foi criada.');
    } catch (err) {
      toast.error('Falho no servidor, informe ao administrador do sistema.');
      throw err;
    }
  }, []);

  return <Base title="Cadastrar encomenda" onPress={handleSubmit} />;
}
