import styled from 'styled-components';

import LogoDefault from '~/components/Logo';

export const Container = styled.header`
  border: 1px solid ${props => props.theme.colors.content};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;

  div {
    display: flex;
    align-items: center;
  }

  div.right {
    display: flex;
    flex-direction: column;

    button {
      color: ${props => props.theme.colors.error};
    }
  }
`;

export const Logo = styled(LogoDefault)`
  width: 15rem;
  border-right: 1px solid ${props => props.theme.colors.content};
  padding: 0.5rem 1.5rem;
  margin: 1rem 2rem 1rem 0;
`;
