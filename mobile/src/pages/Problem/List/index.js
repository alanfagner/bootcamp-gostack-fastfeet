import React, {
  useEffect,
  useState,
  useContext,
  useMemo,
  useCallback,
} from 'react';

import { NavigationRouteContext } from '@react-navigation/native';
import { Background, Label } from '~/components/Form';
import { Container, List, ItemContainer } from './styles';

import { formateDate } from '~/utils';
import api from '~/services/api';

export default function Problem() {
  const [problems, setProblems] = useState({ data: [], loading: true });
  const route = useContext(NavigationRouteContext);
  const { delivery } = useMemo(() => route.params, [route.params]);

  useEffect(() => {
    async function loadData() {
      const { data } = await api.get(`/deliveries/${delivery.id}/problems`);
      setProblems(prev => ({
        ...prev,
        data: data.map(problemParam => ({
          ...problemParam,
          createDtFormated: formateDate(problemParam.createdAt),
        })),
        loading: false,
      }));
    }
    loadData();
  }, [delivery.id]);

  const renderItem = useCallback(
    ({ item }) => (
      <ItemContainer>
        <Label style={{ flexWrap: 'wrap', flex: 1 }}>{item.description}</Label>
        <Label fontSize="small">{item.createDtFormated}</Label>
      </ItemContainer>
    ),
    []
  );

  return (
    <Background>
      <Container>
        <Label color="white" bold style={{ textAlign: 'center' }}>
          {delivery.product}
        </Label>

        <List
          data={problems.data}
          renderItem={renderItem}
          keyExtractor={item => String(item.id)}
        />
      </Container>
    </Background>
  );
}
