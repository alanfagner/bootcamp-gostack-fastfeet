import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components';
import { View, ScrollView } from 'react-native';
import {
  NavigationRouteContext,
  NavigationContext,
} from '@react-navigation/native';
import { formateDate } from '~/utils';

import DeliveryDescribe from '~/components/DeliveryDescribe';

import { Container, RowContainer } from './styles';
import { Background, Label, ActionButton, Divider } from '~/components/Form';

export default function Delivery() {
  const navigation = useContext(NavigationContext);
  const route = useContext(NavigationRouteContext);
  const theme = useContext(ThemeContext);
  const { delivery } = route.params;

  function handleProblem() {
    navigation.navigate('Problem', { deliveryId: delivery.id });
  }

  function handleListProblem() {
    navigation.navigate('ListProblem', { delivery });
  }

  function handleConfirmDelivery() {
    navigation.navigate('CofirmDelivery', { delivery });
  }

  return (
    <Background>
      <ScrollView>
        <Container>
          <DeliveryDescribe
            iconName="local-shipping"
            describe="Informaçao da entrega"
          />

          <View style={{ margin: 10 }} />

          <Label bold>DESTINATARIO</Label>
          <Label>{delivery.recipient.name}</Label>

          <View style={{ margin: 10 }} />

          <Label bold>ENDEREÇO DE ENTREGA</Label>
          <Label>{`${delivery.recipient.address}, ${delivery.recipient.number}, ${delivery.recipient.city} - ${delivery.recipient.state}, ${delivery.recipient.zipCode}`}</Label>

          <View style={{ margin: 10 }} />

          <Label bold>PRODUTO</Label>
          <Label>{delivery.product}</Label>
        </Container>
        <Container>
          <DeliveryDescribe iconName="event" describe="Situaçao da entrega" />

          <View style={{ margin: 10 }} />

          <Label bold>STATUS</Label>
          <Label>{delivery.recipient.name}</Label>

          <View style={{ margin: 10 }} />

          <RowContainer>
            <View>
              <Label bold>DATA DE RETIRADA</Label>
              <Label>
                {delivery.startDate ? formateDate(delivery.startDate) : ' - '}
              </Label>
            </View>
            <View>
              <Label bold>DATA DE ENTREGA</Label>
              <Label>
                {delivery.endDate ? formateDate(delivery.endDate) : ' - '}
              </Label>
            </View>
          </RowContainer>
        </Container>
        <RowContainer style={{ marginVertical: 10, marginHorizontal: 20 }}>
          <ActionButton
            onPress={() => handleProblem()}
            color={theme.colors.error}
            text={'Informar\nProblema'}
            iconName="highlight-off"
          />
          <Divider />
          <ActionButton
            onPress={() => handleListProblem()}
            color={theme.colors.info}
            text={'Visualisar\nProblema'}
            iconName="info-outline"
          />
          <Divider />
          <ActionButton
            onPress={() => handleConfirmDelivery()}
            color={theme.colors.primary}
            text={'Confirmar\nEntrega'}
            iconName="check-circle"
          />
        </RowContainer>
      </ScrollView>
    </Background>
  );
}
