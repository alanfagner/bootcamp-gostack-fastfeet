import styled from 'styled-components';

import LogoDefault from '~/components/Logo';

export const Image = styled(LogoDefault)`
  width: 15rem;
  align-self: center;
  margin-bottom: 1rem;
`;

export const Container = styled.div`
  width: 100%;
  max-width: 365px;
  text-align: center;
  background: ${props => props.theme.colors.background};
  border-radius: 4px;
  padding: 30px;

  form {
    display: flex;
    flex-direction: column;
    margin-bottom: 1rem;
  }
`;
