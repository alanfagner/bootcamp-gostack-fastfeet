import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RectButton } from 'react-native-gesture-handler';
import { View } from 'react-native';
import PropTypes from 'prop-types';

import Deliveries from '~/components/Deliveries';
import {
  Container,
  Header,
  Content,
  ContentText,
  Avatar,
  ExitIcon,
} from './styles';
import { Label } from '~/components/Form';
import { signOutRequest } from '~/store/modules/auth/actions';

import { baseURL } from '~/services/api';

export default function Dashboard() {
  const { user } = useSelector(state => state);

  const dispatch = useDispatch();

  function handleSignOut() {
    dispatch(signOutRequest());
  }

  return (
    <Container>
      <Header>
        <Content>
          <Avatar source={{ uri: `${baseURL}/${user.profile.avatar.url}` }} />
          <ContentText>
            <Label>Bem vindo de volta,</Label>
            <Label bold numberOfLines={1} ellipsizeMode="tail">
              {user.profile.name}
            </Label>
          </ContentText>
        </Content>

        <RectButton onPress={handleSignOut}>
          <View accessible>
            <ExitIcon />
          </View>
        </RectButton>
      </Header>

      <Deliveries userId={user.profile.id} />
    </Container>
  );
}

Dashboard.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};
