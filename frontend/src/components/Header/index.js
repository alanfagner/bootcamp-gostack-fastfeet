import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Menu from '../Menu';

import { signOut } from '~/store/modules/auth/actions';
import { Button } from '~/components/Form';

import { Container, Logo } from './styles';

export default function Header() {
  const dispatch = useDispatch();
  const { name } = useSelector(state => state.user.profile);

  function handleLogout() {
    dispatch(signOut());
  }

  return (
    <Container>
      <div>
        <Logo />
        <Menu />
      </div>
      <div className="right">
        <strong>{name}</strong>
        <Button onClick={handleLogout} type="button" className="link">
          sair do sistema
        </Button>
      </div>
    </Container>
  );
}
