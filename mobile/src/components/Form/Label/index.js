import styled from 'styled-components/native';

export default styled.Text`
  color: ${({ theme, color }) => `${theme.colors[color] || theme.colors.text}`};
  font-size: ${({ theme, fontSize }) =>
    theme.fonts[fontSize] || theme.fonts.medium};
  font-weight: ${({ bold }) => (bold ? 'bold' : 'normal')};
`;
