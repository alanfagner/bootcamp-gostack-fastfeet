import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export default styled(RectButton)`
  background: ${({ theme, red, primary }) => {
    if (red) {
      return theme.colors.error;
    }

    if (primary) {
      return theme.colors.primary;
    }

    return theme.colors.secundary;
  }};

  width: 100%;
  height: 50px;
  border-radius: 4px;

  align-items: center;
  justify-content: center;
`;
