import styled from 'styled-components';

export const Container = styled.div`
  background: ${props => props.theme.colors.background};
  border: 1px solid ${props => props.theme.colors.disable};

  display: flex;
  align-items: center;

  border-radius: 4px;

  svg {
    margin: 0.5rem;
  }

  input {
    border: 0;
    border-radius: 4px;
  }
`;
