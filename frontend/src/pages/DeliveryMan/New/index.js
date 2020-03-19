import React, { useCallback } from 'react';
import { toast } from 'react-toastify';

import api from '~/services/api';
import Base from '../Base';

export default function New() {
  const handleSubmit = useCallback(async formData => {
    try {
      if (formData.get('file') === null) {
        toast.error('Adicione um avatar foto.');
        return false;
      }

      await api.post('/deliverymans', formData);
      toast.success('Entregador criada com sucesso.');
      return true;
    } catch (err) {
      toast.error('Falho no servidor, informe ao administrador do sistema.');
      throw err;
    }
  }, []);

  return <Base onPress={handleSubmit} title="Cadastrar entregador" />;
}
