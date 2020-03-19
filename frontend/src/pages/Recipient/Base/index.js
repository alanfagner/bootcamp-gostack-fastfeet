import React, { useCallback, useRef } from 'react';
import { Form } from '@unform/web';
import PropTypes from 'prop-types';
import { FaCheck, FaChevronLeft } from 'react-icons/fa';
import history from '~/services/history';

import { Link, Button, Input } from '~/components/Form';

import { Container, SearchContainer, Two, Three } from './styles';
import { newRecipientValidation } from '~/validations/recipientValidation';

export default function Base({ title, onPress, defaultValues }) {
  const formRef = useRef(null);

  const handleSubmit = useCallback(
    async ({ name, address, complement, number, city, state, zipCode }) => {
      formRef.current.setErrors({});
      try {
        await newRecipientValidation({ name, address, complement, number, city, state, zipCode });
        await onPress({ name, address, complement, number, city, state, zipCode });
        history.push('/recipients');
      } catch (err) {
        if (err.validationErrors) {
          formRef.current.setErrors(err.validationErrors);
        }
      }
    },
    [onPress]
  );

  return (
    <>
      <Container>
        <SearchContainer>
          <h1>{title}</h1>
          <div>
            <Link to="/recipients" className="primary back">
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
          <Input
            defaultValue={defaultValues && defaultValues.name}
            name="name"
            labelName="Nome"
            type="text"
            placeholder="Digite o nome"
          />

          <Two>
            <Input
              defaultValue={defaultValues && defaultValues.address}
              name="address"
              labelName="Endereço"
              type="text"
              placeholder="Digite o endereço"
            />
            <Input
              defaultValue={defaultValues && defaultValues.number}
              name="number"
              labelName="Numero"
              type="number"
              placeholder="Digite o numeo"
            />
            <Input
              defaultValue={defaultValues && defaultValues.complement}
              name="complement"
              labelName="Complemento"
              type="text"
              placeholder="Digite o complemento"
            />
          </Two>
          <Three>
            <Input
              defaultValue={defaultValues && defaultValues.city}
              name="city"
              labelName="Cidade"
              type="text"
              placeholder="Digite a cidade"
            />
            <Input
              defaultValue={defaultValues && defaultValues.state}
              name="state"
              labelName="Estado"
              type="text"
              placeholder="Digite o estado"
            />
            <Input
              defaultValue={defaultValues && defaultValues.zipCode}
              name="zipCode"
              labelName="CEP"
              type="number"
              placeholder="Digite o cep"
            />
          </Three>
        </Form>
      </Container>
    </>
  );
}

Base.propTypes = {
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  defaultValues: PropTypes.shape({
    name: PropTypes.string,
    address: PropTypes.string,
    number: PropTypes.number,
    complement: PropTypes.string,
    city: PropTypes.string,
    state: PropTypes.string,
    zipCode: PropTypes.number,
  }),
};

Base.defaultProps = {
  defaultValues: null,
};
