import React, { useState, useCallback, useEffect } from 'react';
import { toast } from 'react-toastify';

import api from '~/services/api';
import Table from '~/components/Table';
import DropdownMenu from '~/components/DropdownMenu';

import { Container } from './styles';
import Visualize from '../Vizualize';

export default function List() {
  const [problems, setProblems] = useState({ data: [], loading: true });
  const [describe, setDescribe] = useState(null);

  const loadData = useCallback(async name => {
    const { data } = await api.get('deliveries/problems', { params: { name } });

    const formatData = data.map(recipient => ({
      ...recipient,
      fullAddress: `${recipient.address}, ${recipient.number}, ${recipient.city} - ${recipient.state} `,
    }));

    setProblems(prev => ({ ...prev, data: formatData, loading: false }));
  }, []);

  async function onCancel(id) {
    try {
      await api.put(`/problems/${id}/cancel-delivery`);
      toast.success('Encomenda cancelada.');
    } catch (error) {
      toast.error('Erro ao cancelar, contato o administrador do sistema');
    }
  }

  useEffect(() => {
    loadData();
  }, [loadData]);

  return (
    <Container>
      {describe && <Visualize describer={describe} onClose={() => setDescribe(null)} />}
      <h1>Problemas na entrega</h1>
      {!problems.loading && (
        <Table>
          <thead>
            <tr>
              <th align="left" className="p-1">
                Encomenda
              </th>
              <th align="left">Problema</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {problems.data.length !== 0 ? (
              problems.data.map(item => (
                <tr key={item.deliveryId}>
                  <th align="left" className="p-1">{`#${item.deliveryId}`}</th>
                  <th align="left">
                    <span> {item.description}</span>
                  </th>
                  <th>
                    <DropdownMenu onVisualize={() => setDescribe(item.description)} onCancel={onCancel} id={item.id} />
                  </th>
                </tr>
              ))
            ) : (
              <tr>
                 <td> <div className="p-1"> Não existe registros. </div> </td>
                <td />
                <td />
              </tr>
            )}
          </tbody>
        </Table>
      )}
    </Container>
  );
}
