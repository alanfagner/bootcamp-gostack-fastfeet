import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  span {
    border-radius: 100rem;
    padding: 0.6rem;
    margin-right: 0.3rem;
    background: ${props => props.theme.colors.pending};
    color: ${props => darken(0.4, props.theme.colors.pending)};
    text-transform: uppercase;
  }
`;
