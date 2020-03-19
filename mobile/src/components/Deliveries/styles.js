import styled from 'styled-components/native';
import { Label } from '~/components/Form';

export const List = styled.FlatList`
  flex: 1;
`;

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const ContentHeader = styled.View`
  flex-direction: row;
`;

export const Button = styled.TouchableOpacity``;

export const TitleButton = styled(Label).attrs(({ delivered }) => ({
  color: delivered ? 'primary' : 'text',
  bold: true,
}))`
  text-decoration: ${({ delivered }) => (delivered ? 'underline' : 'none')};
  margin: 5px;
  font-size: ${({ theme }) => theme.fonts.small};
`;
