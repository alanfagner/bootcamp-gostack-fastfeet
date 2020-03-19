import styled from 'styled-components';
import { darken } from 'polished';

export default styled.button`
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

  svg {
    margin-right: 0.5rem;
  }

  &.link {
    background: transparent;
    font-weight: normal;
    &:hover {
      background: ${props => props.theme.colors.content};
    }
  }

  &.primary {
    text-transform: uppercase;
    background: ${props => props.theme.colors.primary};
    color: #fff;
    &:hover {
      background: ${props => darken(0.07, props.theme.colors.primary)};
    }
  }
`;
