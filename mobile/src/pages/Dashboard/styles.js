import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export const Container = styled.SafeAreaView`
  flex: 1;
  padding: 3% 5% 0%;
  background: white;
`;

export const Header = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
`;

export const Content = styled.View`
  flex: 1;
  flex-direction: row;
`;

export const ContentText = styled.View`
  justify-content: center;
  margin-left: 10px;
`;

export const Avatar = styled.Image`
  width: 80px;
  height: 80px;
  border-radius: 40px;
`;

export const ExitIcon = styled(Icon).attrs(({ theme }) => ({
  name: 'exit-to-app',
  size: 30,
  color: theme.colors.error,
}))``;
