/* eslint-disable react/jsx-props-no-spreading */
import React, { useCallback, useRef, useState } from 'react';
import { Form } from '@unform/web';
import PropTypes from 'prop-types';
import { useDropzone } from 'react-dropzone';
import { FaCheck, FaChevronLeft, FaImage } from 'react-icons/fa';

import history from '~/services/history';
import { baseURL } from '~/services/api';
import { Link, Button, Input } from '~/components/Form';
import { Container, SearchContainer } from './styles';
import { newDeliveryManValidation } from '~/validations/deliveryManValidation';

export default function Base({ onPress, defaultValue, title }) {
  const formRef = useRef(null);

  const [image, setImage] = useState(null);

  const onDrop = useCallback(acceptedFiles => {
    setImage(acceptedFiles[0]);
  }, []);
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const handleSubmit = useCallback(
    async ({ name, email }) => {
      formRef.current.setErrors({});

      const data = new FormData();

      if (image) data.append('file', image);
      data.append('name', name);
      data.append('email', email);

      try {
        await newDeliveryManValidation({ name, email });
        const isOk = await onPress(data);
        if (isOk) history.push('/delivery-mans');
      } catch (err) {
        if (err.validationErrors) {
          formRef.current.setErrors(err.validationErrors);
        }
      }
    },
    [image, onPress]
  );

  return (
    <>
      <Container>
        <SearchContainer>
          <h1> {title}</h1>

          <div>
            <Link to="/delivery-mans" className="primary back">
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
          <div {...getRootProps()} className="upload-container">
            <input name="file" {...getInputProps()} />

            {!image && !defaultValue && (
              <div className="upload-file">
                <FaImage size={80} />

                <p>ADICIONAR FOTO</p>
              </div>
            )}

            {(image || defaultValue) && (
              <div className="preview-file">
                <img src={image ? URL.createObjectURL(image) : `${baseURL}/${defaultValue.avatar.url}`} alt="Avatar" />

                <p>ADICIONAR FOTO</p>
              </div>
            )}
          </div>

          <Input
            defaultValue={defaultValue && defaultValue.name}
            name="name"
            labelName="Nome"
            type="text"
            placeholder="Digite o nome do entregador"
          />

          <Input
            defaultValue={defaultValue && defaultValue.email}
            name="email"
            labelName="Email"
            type="email"
            placeholder="Digite o email"
          />
        </Form>
      </Container>
    </>
  );
}

Base.propTypes = {
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  defaultValue: PropTypes.shape({
    avatar: PropTypes.shape({ url: PropTypes.string }),
    name: PropTypes.string,
    email: PropTypes.string,
  }),
};

Base.defaultProps = {
  defaultValue: null,
};
