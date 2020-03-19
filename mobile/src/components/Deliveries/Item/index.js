import React, { memo, useContext } from 'react';
import PropTypes from 'prop-types';
import { NavigationContext } from '@react-navigation/native';
import {
  Container,
  Footer,
  ShowDetails,
  DescribeContainer,
  TitleContainer,
} from './styles';

import { Label } from '~/components/Form';
import DeliveryDescribe from '~/components/DeliveryDescribe';
import Steps from '~/components/Steps';

function Item({ delivery }) {
  const navigation = useContext(NavigationContext);

  function handleOnPress() {
    navigation.navigate('Delivery', { delivery });
  }

  return (
    <Container>
      <TitleContainer>
        <DeliveryDescribe
          iconName="local-shipping"
          describe={delivery.product}
        />
      </TitleContainer>
      <Steps currentStep={delivery.step} />
      <Footer>
        <DescribeContainer>
          <Label fontSize="small">Data</Label>
          <Label bold textSecundary>
            {delivery.createdFormated}
          </Label>
        </DescribeContainer>
        <DescribeContainer>
          <Label fontSize="small">Cidade</Label>
          <Label bold textSecundary>
            {delivery.recipient.city}
          </Label>
        </DescribeContainer>
        <ShowDetails onPress={handleOnPress}>
          <Label fontSize="small" color="primary" bold>
            Ver detalhes
          </Label>
        </ShowDetails>
      </Footer>
    </Container>
  );
}

Item.propTypes = {
  delivery: PropTypes.shape({
    product: PropTypes.string,
    createdFormated: PropTypes.string,
    step: PropTypes.number,
    recipient: PropTypes.shape({
      city: PropTypes.string,
    }),
  }).isRequired,
};

export default memo(Item);
