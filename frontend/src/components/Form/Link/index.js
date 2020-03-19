import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { darken, lighten } from 'polished';

export default styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.6rem 0.8rem;
  font-weight: bold;
  border: 0;
  border-radius: 4px;
  font-size: 16px;
  transition: background 0.2s;
  cursor: pointer;
  text-decoration: none;

  text-transform: uppercase;
  background: ${props => props.theme.colors.primary};
  color: #fff;

  &.back {
    background: ${props => lighten(0.3, props.theme.colors.text)};
  }

  &.back:hover {
    background: ${props => lighten(0.1, props.theme.colors.text)};
  }

  &:hover {
    background: ${props => darken(0.07, props.theme.colors.primary)};
  }

  svg {
    margin-right: 0.5rem;
  }
`;
