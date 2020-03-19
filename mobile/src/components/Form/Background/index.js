import LinearGradient from 'react-native-linear-gradient';
import styled from 'styled-components/native';

export default styled(LinearGradient).attrs(({ theme }) => ({
  colors: [theme.colors.primary, '#fff'],
  start: { x: 1, y: 0.24999 },
  end: { x: 1, y: 0.25 },
}))`
  flex: 1;
`;
