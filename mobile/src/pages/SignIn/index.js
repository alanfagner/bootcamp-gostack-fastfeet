import React, { useRef, useCallback } from 'react';
import { Keyboard } from 'react-native';
import { Form } from '@unform/mobile';
import { useDispatch } from 'react-redux';

import { Button, Label } from '~/components/Form';
import { Container, StatusBar, Logo, Input } from './styles';

import { loginValidation } from '~/validation/loginValidation';
import { signInRequest } from '~/store/modules/auth/actions';

export default function SignIn() {
  const formRef = useRef(null);
  const dispatch = useDispatch();

  const handleSubmit = useCallback(
    async ({ deliveryMan }) => {
      formRef.current.setErrors({});

      Keyboard.dismiss();
      try {
        await loginValidation({ deliveryMan });

        dispatch(signInRequest(deliveryMan));
      } catch (err) {
        if (err.validationErrors) {
          formRef.current.setErrors(err.validationErrors);
        }
      }
    },
    [dispatch]
  );

  return (
    <Container>
      <StatusBar />

      <Logo />

      <Form ref={formRef} onSubmit={handleSubmit}>
        <Input name="deliveryMan" />

        <Button onPress={() => formRef.current.submitForm()}>
          <Label color="white" bold>
            Entrar no sistema
          </Label>
        </Button>
      </Form>
    </Container>
  );
}
