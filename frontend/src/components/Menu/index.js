import React from 'react';

import { Link } from 'react-router-dom';
import { Container } from './styles';

export default function Menu() {
  return (
    <Container>
      <nav>
        <Link to="/deliveries">ENCOMENDAS</Link>
        <Link to="/delivery-mans">ENTREGADORES</Link>
        <Link to="/recipients">DESTINATARIOS</Link>
        <Link to="/problems">PROBLEMAS</Link>
      </nav>
    </Container>
  );
}
