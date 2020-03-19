import React, { useState, useCallback, useEffect } from 'react';
import { toast } from 'react-toastify';
import { FaPlusCircle } from 'react-icons/fa';

import api from '~/services/api';
import { createSigla, createStatus } from '~/util';
import { Link } from '~/components/Form';
import history from '~/services/history';
import SearchContainer from '~/components/SearchContainer';

import SearchInput from '~/components/SearchInput';
import Table from '~/components/Table';
import Status from '~/components/Status';
import SiglaName from '~/components/SiglaName';
import DropdownMenu from '~/components/DropdownMenu';

import Visualize from '../Visualize';

import { Container } from './styles';

export default function List() {
  const [deliveries, setDeliveries] = useState({ data: [], loading: true });
  const [deliverySelected, setDeliverySelected] = useState(null);

  const formatDeliveires = useCallback(data => {
    return data.map(delivery => ({
      ...delivery,
      sigla: createSigla(delivery.deliveryMan.name),
      deliveryState: createStatus(delivery),
    }));
  }, []);

  const loadData = useCallback(
    async product => {
      const { data } = await api.get('/deliveries', { params: { product } });
      setDeliveries(prev => ({ ...prev, data: formatDeliveires(data), loading: false }));
    },
    [formatDeliveires]
  );

  function onEdit(id) {
    history.push(`/deliveries/${id}`);
  }

  function onVisualize(item) {
    setDeliverySelected(item);
  }

  async function onDelete(id) {
    try {
      await api.delete(`/deliveries/${id}`);
      const newList = deliveries.data.filter(delivery => delivery.id !== id);
      setDeliveries(prev => ({ ...prev, data: newList }));
      toast.success('Item deletado');
    } catch (error) {
      toast.error('Erro ao deletar, contato o administrador do sistema');
    }
  }

  useEffect(() => {
    loadData();
  }, [loadData]);

  return (
    <>
      {deliverySelected && <Visualize delivery={deliverySelected} onClose={() => setDeliverySelected(null)} />}
      <Container>
        <h1>Gerenciando encomendas</h1>
        <SearchContainer>
          <SearchInput loading={deliveries.loading} onSearch={loadData} placeholder="Buscar por encomendas" />

          <Link to="/deliveries/new" className="primary">
            <FaPlusCircle size={20} />
            Cadastrar
          </Link>
        </SearchContainer>
        {!deliveries.loading && (
          <Table>
            <thead>
              <tr>
                <th align="left" className="p-1">
                  ID
                </th>
                <th align="left">Destinatario</th>
                <th align="left">Entregador</th>
                <th align="left">Cidade</th>
                <th align="left">Estado</th>
                <th align="left">Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {deliveries.data.length !== 0 ? (
                deliveries.data.map(item => (
                  <tr key={item.id}>
                    <th align="left" className="p-1">{`#${item.id}`}</th>
                    <th align="left">{item.recipient.name}</th>
                    <th align="left">
                      <SiglaName sigla={item.sigla} name={item.deliveryMan.name} />
                    </th>
                    <th align="left">{item.recipient.city}</th>
                    <th align="left">{item.recipient.state}</th>
                    <th align="left">
                      <Status describeStatus={item.deliveryState} />
                    </th>
                    <th>
                      <DropdownMenu
                        onDelete={onDelete}
                        onEdit={onEdit}
                        onVisualize={() => onVisualize(item)}
                        id={item.id}
                      />
                    </th>
                  </tr>
                ))
              ) : (
                <tr>
                  <td> <div className="p-1"> Não existe registros. </div> </td>
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                </tr>
              )}
            </tbody>
          </Table>
        )}
      </Container>
    </>
  );
}
