import React from 'react';

import logo from '~/assets/logo.png';

export default function Logo({ ...rest }) {
  return <img src={logo} alt="FastFeet" {...rest} />;
}
