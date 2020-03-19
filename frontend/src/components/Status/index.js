import React, { memo } from 'react';
import PropTypes from 'prop-types';

import { Container } from './styles';

function Status({ describeStatus }) {
  return <Container className={describeStatus}>{describeStatus}</Container>;
}

Status.propTypes = {
  describeStatus: PropTypes.string.isRequired,
};

export default memo(Status);
