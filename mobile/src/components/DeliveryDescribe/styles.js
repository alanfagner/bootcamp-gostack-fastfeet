import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export const Header = styled.View`
  align-items: center;
  flex-direction: row;
  border-radius: 4px;
`;

export const MaterialIcon = styled(Icon).attrs(({ theme }) => ({
  size: 30,
  color: theme.colors.primary,
}))`
  margin-right: 10px;
`;
