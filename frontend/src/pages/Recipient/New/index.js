import React, { useCallback } from 'react';
import { toast } from 'react-toastify';

import api from '~/services/api';
import Base from '../Base';

export default function New() {
  const handleSubmit = useCallback(async ({ name, address, complement, number, city, state, zipCode }) => {
    try {
      await api.post(`/recipients`, { name, address, complement, number, city, state, zipCode });
      toast.success('Destinatario foi criada.');
    } catch (err) {
      toast.error('Falho no servidor, informe ao administrador do sistema.');
      throw err;
    }
  }, []);

  return <Base title="Cadastro de destinatario" onPress={handleSubmit} />;
}
