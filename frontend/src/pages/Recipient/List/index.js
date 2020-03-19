import React, { useState, useCallback, useEffect } from 'react';
import { toast } from 'react-toastify';
import { FaPlusCircle } from 'react-icons/fa';

import api from '~/services/api';
import { Link } from '~/components/Form';
import history from '~/services/history';
import SearchContainer from '~/components/SearchContainer';

import SearchInput from '~/components/SearchInput';
import Table from '~/components/Table';
import DropdownMenu from '~/components/DropdownMenu';

import { Container } from './styles';

export default function List() {
  const [recipients, setRecipients] = useState({ data: [], loading: true });

  const loadData = useCallback(async name => {
    const { data } = await api.get('/recipients', { params: { name } });
    const formatData = data.map(recipient => ({
      ...recipient,
      fullAddress: `${recipient.address}, ${recipient.number}, ${recipient.city} - ${recipient.state} `,
    }));
    setRecipients(prev => ({ ...prev, data: formatData, loading: false }));
  }, []);

  function onEdit(id) {
    history.push(`/recipients/${id}`);
  }

  async function onDelete(id) {
    try {
      await api.delete(`/recipients/${id}`);

      const newList = recipients.data.filter(recipient => recipient.id !== id);

      setRecipients(prev => ({ ...prev, data: newList }));

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
      <h1>Gerenciando destinatarios</h1>
      <SearchContainer>
        <SearchInput onSearch={loadData} loading={recipients.loading} placeholder="Buscar por destinatarios" />
        <Link to="/recipients/new" className="primary">
          <FaPlusCircle size={20} />
          Cadastrar
        </Link>
      </SearchContainer>
      {!recipients.loading && (
        <Table>
          <thead>
            <tr>
              <th align="left" className="p-1">
                ID
              </th>
              <th align="left">Nome</th>
              <th align="left">Endereço</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {recipients.data.length !== 0 ? (
              recipients.data.map(item => (
                <tr key={item.id}>
                  <th align="left" className="p-1">{`#${item.id}`}</th>
                  <th align="left">{item.name}</th>
                  <th align="left">{item.fullAddress}</th>
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
              </tr>
            )}
          </tbody>
        </Table>
      )}
    </Container>
  );
}
