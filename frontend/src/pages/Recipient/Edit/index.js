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
  const [recipient, setRecipient] = useState(null);

  const loadRecipients = useCallback(async () => {
    const { data } = await api.get(`/recipients`, { params: { id } });

    if (data.length === 0) {
      toast.error('Destinatario não encontrada');
      history.push('/recipients');
      return;
    }

    setRecipient({ ...data[0] });
  }, [id]);

  const handleSubmit = useCallback(
    async ({ name, address, complement, number, city, state, zipCode }) => {
      try {
        await api.put(`/recipients/${id}`, { name, address, complement, number, city, state, zipCode });
        toast.success('Destinatario foi atualizado.');
      } catch (err) {
        toast.error('Falho no servidor, informe ao administrador do sistema.');
        throw err;
      }
    },
    [id]
  );

  useEffect(() => {
    loadRecipients();
  }, [loadRecipients]);

  return <> {recipient && <Base onPress={handleSubmit} title="Ediçao de entregadores" defaultValues={recipient} />} </>;
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
