import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';

export const Container = styled.View`
  flex: 1;
  elevation: 2;
  border-radius: 2px;
`;

export const Button = styled(RectButton)`
  background: ${({ theme }) => theme.colors.backgroundLight};
  align-items: center;
  justify-content: center;
  padding: 10px;
`;

export const MaterialIcon = styled(Icon).attrs({ size: 25 })`
  padding: 10px;
`;
