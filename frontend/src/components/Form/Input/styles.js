import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  margin-bottom: 0.5rem;

  input {
    border: 1px solid ${props => props.theme.colors.disable};
    border-radius: 4px;
    font-size: 16px;
    padding: 0.7rem 0.5rem;

    &::placeholder {
      color: ${props => props.theme.colors.disable};
    }
  }

  span {
    color: ${props => props.theme.colors.error};
    align-self: flex-start;
    font-weight: bold;
  }

  label {
    text-align: start;
    font-weight: bold;
    text-transform: uppercase;
    margin-bottom: 0.5rem;
  }
`;
