import React, { useRef, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import { signInRequest } from '~/store/modules/auth/actions';

import { Input, Button } from '~/components/Form';

import { Image, Container } from './styles';

export default function SignIn() {
  const formRef = useRef(null);
  const dispatch = useDispatch();
  const loading = useSelector(state => state.auth.loading);

  const handleSubmit = useCallback(
    async ({ email, password }) => {
      formRef.current.setErrors({});
      try {
        const schema = Yup.object().shape({
          email: Yup.string()
            .email('Insira um e-mail válido')
            .required('O e-mail é obrigatório'),
          password: Yup.string().required('A senha é obrigatória'),
        });

        await schema.validate({ email, password }, { abortEarly: false });

        dispatch(signInRequest(email, password));
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const validationErrors = {};

          if (err instanceof Yup.ValidationError) {
            err.inner.forEach(error => {
              validationErrors[error.path] = error.message;
            });

            formRef.current.setErrors(validationErrors);
          }
        }
      }
    },
    [dispatch]
  );

  return (
    <Container>
      <Image />
      <Form ref={formRef} onSubmit={handleSubmit}>
        <Input name="email" labelName="Seu e-mail" type="text" placeholder="example@email.com" />
        <Input name="password" labelName="Sua senha" type="password" placeholder="Sua senha" />
        <Button className="primary" type="submit">
          {loading ? 'Carregando ...' : 'Entrar no sistema'}
        </Button>
      </Form>
    </Container>
  );
}
