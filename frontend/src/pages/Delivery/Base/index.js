import React, { useEffect, useCallback, useState, useRef } from 'react';
import { Form } from '@unform/web';
import PropTypes from 'prop-types';
import { FaCheck, FaChevronLeft } from 'react-icons/fa';
import history from '~/services/history';

import { Link, Button, Input, Select } from '~/components/Form';
import api from '~/services/api';
import { Container, SearchContainer } from './styles';
import { newDeliveryValidation } from '~/validations/deliveryValidation';

export default function Base({ title, onPress, defaultValues }) {
  const formRef = useRef(null);

  const [data, setData] = useState({ recipients: [], deliveryMans: [], loading: true });

  const loadRecipients = useCallback(async () => {
    const resp = await api.get('/recipients');
    return resp.data.map(({ name, id }) => ({ label: name, value: id }));
  }, []);

  const loadDeliveryMans = useCallback(async () => {
    const resp = await api.get('/deliverymans');
    return resp.data.map(({ name, id }) => ({ label: name, value: id }));
  }, []);

  const handleSubmit = useCallback(
    async ({ recipientId, deliveryManId, product }) => {
      formRef.current.setErrors({});
      try {
        await newDeliveryValidation({ recipientId, deliveryManId, product });
        await onPress({ recipientId, deliveryManId, product });
        history.push('/deliveries');
      } catch (err) {
        if (err.validationErrors) {
          formRef.current.setErrors(err.validationErrors);
        }
      }
    },
    [onPress]
  );

  useEffect(() => {
    async function loadData() {
      const [recipients, deliveryMans] = await Promise.all([loadRecipients(), loadDeliveryMans()]);
      setData(prev => ({ ...prev, recipients, deliveryMans, loading: false }));
    }

    loadData();
  }, [loadDeliveryMans, loadRecipients]);

  return (
    <>
      {!data.loading && (
        <Container>
          <SearchContainer>
            <h1>{title}</h1>
            <div>
              <Link to="/deliveries" className="primary back">
                <FaChevronLeft size={20} />
                Voltar
              </Link>
              <Button className="primary" type="submit" form="form">
                <FaCheck size={20} />
                Salvar
              </Button>
            </div>
          </SearchContainer>

          <Form ref={formRef} name="form" id="form" onSubmit={handleSubmit}>
            <Select
              options={data.recipients}
              defaultValue={defaultValues && defaultValues.recipient}
              name="recipientId"
              labelName="Destinatário"
              type="text"
            />
            <Select
              options={data.deliveryMans}
              defaultValue={defaultValues && defaultValues.deliveryMan}
              name="deliveryManId"
              labelName="Entregador"
              type="text"
            />
            <Input
              defaultValue={defaultValues && defaultValues.product}
              name="product"
              labelName="Nome do produto"
              type="text"
              placeholder="Digite o nome do produto"
            />
          </Form>
        </Container>
      )}
    </>
  );
}

Base.propTypes = {
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  defaultValues: PropTypes.shape({
    recipient: PropTypes.shape({ label: PropTypes.string, value: PropTypes.number }),
    deliveryMan: PropTypes.shape({ label: PropTypes.string, value: PropTypes.number }),
    product: PropTypes.string,
  }),
};

Base.defaultProps = {
  defaultValues: null,
};
