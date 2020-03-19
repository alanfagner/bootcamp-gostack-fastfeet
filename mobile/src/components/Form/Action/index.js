import React from 'react';

import PropTypes from 'prop-types';

import Label from '~/components/Form/Label';
import { Container, Button, MaterialIcon } from './styles';

export default function Action({ text, iconName, color, onPress }) {
  return (
    <Container>
      <Button onPress={onPress}>
        <MaterialIcon name={iconName} color={color} />
        <Label style={{ textAlign: 'center' }}>{text}</Label>
      </Button>
    </Container>
  );
}

Action.propTypes = {
  text: PropTypes.string.isRequired,
  iconName: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
};
