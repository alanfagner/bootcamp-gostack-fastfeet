import styled from 'styled-components/native';
import { StatusBar as StatusBarDefault } from 'react-native';
import { Logo as LogoDefault, Input as InputDefault } from '~/components/Form';

export const Container = styled.View`
  padding: 5%;
  flex: 1;
  justify-content: center;
  align-items: center;
  background: ${props => props.theme.colors.primary};
`;

export const StatusBar = styled(StatusBarDefault).attrs(props => ({
  barStyle: 'light-content',
  backgroundColor: props.theme.colors.primary,
}))``;

export const Logo = styled(LogoDefault)`
  width: 80%;
  height: 80px;
  margin-bottom: 30px;
`;

export const Input = styled(InputDefault).attrs({
  placeholder: 'Informe seu ID de cadastro',
  keyboardType: 'numeric',
})``;
