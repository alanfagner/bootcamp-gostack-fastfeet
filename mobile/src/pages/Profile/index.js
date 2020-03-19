import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { signOutRequest } from '~/store/modules/auth/actions';
import { Label, Button } from '~/components/Form';
import { Container, Avatar, LabelContainer } from './styles';
import { formateDate } from '~/utils';

import { baseURL } from '~/services/api';

export default function Profile() {
  const { user } = useSelector(state => state);
  const dispatch = useDispatch();

  return (
    <Container>
      <Avatar source={{ uri: `${baseURL}/${user.profile.avatar.url}` }} />

      <LabelContainer>
        <Label fontSize="small">Nome completo</Label>
        <Label bold>{user.profile.name}</Label>
      </LabelContainer>

      <LabelContainer>
        <Label fontSize="small">Email</Label>
        <Label bold>{user.profile.email}</Label>
      </LabelContainer>

      <LabelContainer>
        <Label fontSize="small">Data de cadastro</Label>
        <Label bold>{formateDate(user.profile.createdAt)}</Label>
      </LabelContainer>

      <Button
        red
        style={{ marginTop: 60 }}
        onPress={() => dispatch(signOutRequest())}
      >
        <Label bold color="white">
          Logout
        </Label>
      </Button>
    </Container>
  );
}
