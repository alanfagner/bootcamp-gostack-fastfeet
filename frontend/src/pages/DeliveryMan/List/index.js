import React, { useState, useCallback, useEffect } from 'react';
import { toast } from 'react-toastify';
import { FaPlusCircle } from 'react-icons/fa';

import api, { baseURL } from '~/services/api';
import { createSigla } from '~/util';
import { Link } from '~/components/Form';
import history from '~/services/history';
import SearchContainer from '~/components/SearchContainer';

import SearchInput from '~/components/SearchInput';
import Table from '~/components/Table';
import DropdownMenu from '~/components/DropdownMenu';

import { Container } from './styles';

export default function List() {
  const [deliveryMans, setDeliveryMans] = useState({ data: [], loading: true });

  const loadData = useCallback(async name => {
    const { data } = await api.get('/deliverymans', { params: { name } });

    const formatData = data.map(deliveryMan => ({ ...deliveryMan, sigla: createSigla(deliveryMan.name) }));
    setDeliveryMans(prev => ({ ...prev, data: formatData, loading: false }));
  }, []);

  function onEdit(id) {
    history.push(`/delivery-mans/${id}`);
  }

  async function onDelete(id) {
    try {
      await api.delete(`/deliverymans/${id}`);

      const newList = deliveryMans.data.filter(deliveryMan => deliveryMan.id !== id);

      setDeliveryMans(prev => ({ ...prev, data: newList }));

      toast.success('Item deletado');
    } catch (error) {
      toast.error('Erro ao deletar, contato o administrador do sistema');
    }
  }

  useEffect(() => {
    loadData();
  }, [loadData]);

  return (
    <Container>
      <h1>Gerenciando entregadores</h1>
      <SearchContainer>
        <SearchInput onSearch={loadData} loading={deliveryMans.loading} placeholder="Buscar por entregadores" />
        <Link to="/delivery-mans/new" className="primary">
          <FaPlusCircle size={20} />
          Cadastrar
        </Link>
      </SearchContainer>
      {!deliveryMans.loading && (
        <Table>
          <thead>
            <tr>
              <th align="left" className="p-1">
                ID
              </th>
              <th align="left">Foto</th>
              <th align="left">Nome</th>
              <th align="left">Email</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {deliveryMans.data.length !== 0 ? (
              deliveryMans.data.map(item => (
                <tr key={item.id}>
                  <th align="left" className="p-1">{`#${item.id}`}</th>
                  <th align="left">
                    <div className="avatar">
                      <img src={`${baseURL}/${item.avatar.url}`} alt="Avatar" />
                    </div>
                  </th>
                  <th align="left">{item.name}</th>
                  <th align="left">{item.email}</th>
                  <th>
                    <DropdownMenu onDelete={onDelete} onEdit={onEdit} id={item.id} />
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
              </tr>
            )}
          </tbody>
        </Table>
      )}
    </Container>
  );
}
