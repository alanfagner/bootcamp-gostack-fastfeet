import React, { useEffect, useState, useCallback } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';

import api from '~/services/api';
import { List, Header, ContentHeader, Button, TitleButton } from './styles';

import Item from './Item';
import { Label } from '~/components/Form';
import { calcStep, formateDate } from '~/utils';

export default function Deliveries({ userId }) {
  const [deliveries, setDeliveries] = useState({
    data: [],
    loading: true,
    delivered: false,
  });

  const loadData = useCallback(async (delivered, userIdParam) => {
    const { data } = await api.get(`/deliverymans/${userIdParam}/deliveries`, {
      params: { delivered },
    });

    setDeliveries(prev => ({
      ...prev,
      data: data.map(delivery => ({
        ...delivery,
        step: calcStep(delivery),
        createdFormated: formateDate(delivery.createdAt),
      })),
      loading: false,
    }));
  }, []);

  useEffect(() => {
    loadData(deliveries.delivered, userId);
  }, [deliveries.delivered, loadData, userId]);

  const renderItem = useCallback(({ item }) => <Item delivery={item} />, []);

  return (
    <>
      <Header>
        <Label fontSize="big" bold>
          Entregas
        </Label>
        <ContentHeader>
          <Button
            onPress={() =>
              setDeliveries(prev => ({ ...prev, delivered: false }))
            }
          >
            <TitleButton delivered={!deliveries.delivered}>
              Pendentes
            </TitleButton>
          </Button>
          <Button
            onPress={() =>
              setDeliveries(prev => ({ ...prev, delivered: true }))
            }
          >
            <TitleButton delivered={deliveries.delivered}>
              Entregues
            </TitleButton>
          </Button>
        </ContentHeader>
      </Header>
      <List
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => (
          <View style={{ marginBottom: 10, paddingBottom: 10 }} />
        )}
        data={deliveries.data}
        renderItem={renderItem}
        keyExtractor={item => String(item.id)}
        refreshing={deliveries.loading}
      />
    </>
  );
}

Deliveries.propTypes = {
  userId: PropTypes.number.isRequired,
};
