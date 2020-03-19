import styled, { css } from 'styled-components/native';

export const TextInput = styled.TextInput.attrs(({ error, theme }) => ({
  placeholderTextColor: error ? theme.colors.error : undefined,
}))`
  background: white;
  width: 100%;
  border-radius: 4px;
  margin-bottom: 30px;
  padding-left: 10px;
  font-size: ${props => props.theme.fonts.medium};

  ${({ error, theme }) =>
    error &&
    css`
      border: 0.5px solid ${theme.colors.error};
    `}
`;
