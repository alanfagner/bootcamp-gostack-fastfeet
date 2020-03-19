import React, { useCallback, useRef, useContext, useMemo } from 'react';
import { KeyboardAvoidingView, Keyboard, ToastAndroid } from 'react-native';
import { Form } from '@unform/mobile';

import {
  NavigationRouteContext,
  NavigationContext,
} from '@react-navigation/native';
import { Background, Button, Label } from '~/components/Form';
import { Container, InputProblem } from './styles';
import { problemValidation } from '~/validation/problemValidation';

import api from '~/services/api';

export default function Problem() {
  const formRef = useRef();
  const route = useContext(NavigationRouteContext);
  const navigation = useContext(NavigationContext);

  const { deliveryId } = useMemo(() => route.params, [route.params]);

  const handleSubmit = useCallback(
    async ({ description }) => {
      formRef.current.setErrors({});

      Keyboard.dismiss();
      try {
        await problemValidation({ description });
        await api.post(`/deliveries/${deliveryId}/problems`, { description });
        ToastAndroid.show('Problema criado com sucesso.', ToastAndroid.SHORT);
        navigation.goBack();
      } catch (err) {
        if (err.validationErrors) {
          formRef.current.setErrors(err.validationErrors);
        }
      }
    },
    [deliveryId, navigation]
  );

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" enabled>
      <Background>
        <Container>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <InputProblem
              style={{ textAlignVertical: 'top' }}
              name="description"
              multiline
              numberOfLines={15}
              placeholder="Inclua aqui o problema que ocorreu na entrega."
            />
            <Button primary onPress={() => formRef.current.submitForm()}>
              <Label bold color="white">
                Enviar
              </Label>
            </Button>
          </Form>
        </Container>
      </Background>
    </KeyboardAvoidingView>
  );
}
