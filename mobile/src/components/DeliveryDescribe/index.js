import React from 'react';
import PropType from 'prop-types';

import { Label } from '~/components/Form';
import { Header, MaterialIcon } from './styles';

export default function DeliveryDescribe({ describe, iconName }) {
  return (
    <Header>
      <MaterialIcon name={iconName} />
      <Label color="primary" bold>
        {describe}
      </Label>
    </Header>
  );
}

DeliveryDescribe.propTypes = {
  describe: PropType.string.isRequired,
  iconName: PropType.string.isRequired,
};
