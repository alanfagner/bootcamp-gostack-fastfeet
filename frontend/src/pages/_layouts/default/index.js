import React from 'react';
import PropTypes from 'prop-types';

import { Wrapper } from './styles';
import Header from '~/components/Header';

export default function DefaultLayout({ children }) {
  return (
    <Wrapper>
      <Header />
      <content>{children}</content>
    </Wrapper>
  );
}

DefaultLayout.propTypes = {
  children: PropTypes.element.isRequired,
};
