import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.View`
  flex: 1;
  margin: 30px;
`;

export const ImageContainer = styled.View`
  flex: 1;
`;

export const ButtonCamera = styled(RectButton)`
  background: rgba(0, 0, 0, 0.25);
  align-items: center;
  position: absolute;
  border-radius: 50px;
  padding: 15px;
  bottom: 50px;
  position: absolute;

  left: 40%;
`;
