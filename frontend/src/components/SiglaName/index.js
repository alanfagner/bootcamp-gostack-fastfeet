import React, { memo } from 'react';

import PropTypes from 'prop-types';
import { Container } from './styles';

function SiglaName({ sigla, name }) {
  return (
    <Container>
      <span>{sigla}</span>
      {name}
    </Container>
  );
}

SiglaName.propTypes = {
  name: PropTypes.string.isRequired,
  sigla: PropTypes.string.isRequired,
};

export default memo(SiglaName);
