import React from 'react';
import PropTypes from 'prop-types';
import { Container } from './styles';
import { Button } from '~/components/Form';

export default function Visualize({ describer, onClose }) {
  return (
    <Container>
      <content>
        <strong>Informacao da encomenda</strong>
        <span>{describer}</span>
        <Button type="button" onClick={onClose}>
          Fechar
        </Button>
      </content>
    </Container>
  );
}

Visualize.propTypes = {
  describer: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};
