import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  nav {
    display: flex;
    align-items: center;

    a {
      font-weight: bold;
      color: ${props => props.theme.colors.textHeader};
      text-decoration: none;

      & + a {
        margin-left: 1rem;
      }
    }
  }
`;
