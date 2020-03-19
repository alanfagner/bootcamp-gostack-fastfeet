import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 0.5rem;

  .react-select__control {
    border: 1px solid ${props => props.theme.colors.disable};
    border-radius: 4px;
    font-size: 16px;

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
    margin-bottom: 0.5rem;
  }
`;
