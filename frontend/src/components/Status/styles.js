import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.span`
  border-radius: 100rem;
  padding: 0.2rem 0.5rem 0.2rem 0.5rem;

  text-transform: uppercase;

  &::before {
    content: ' ';
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: black;
    margin: 0.5rem 0.5rem 0.5rem 0.1rem;
    display: inline-flex;
    background: ${props => darken(0.4, props.theme.colors.pending)};
  }

  &.Pendente {
    background: ${props => props.theme.colors.pending};
    color: ${props => darken(0.4, props.theme.colors.pending)};

    &::before {
      background: ${props => darken(0.4, props.theme.colors.pending)};
    }
  }

  &.Entregue {
    background: ${props => props.theme.colors.delivered};
    color: ${props => darken(0.4, props.theme.colors.delivered)};

    &::before {
      background: ${props => darken(0.4, props.theme.colors.delivered)};
    }
  }

  &.Retirada {
    background: ${props => props.theme.colors.removal};
    color: ${props => darken(0.4, props.theme.colors.removal)};

    &::before {
      background: ${props => darken(0.4, props.theme.colors.removal)};
    }
  }

  &.Cancelada {
    background: ${props => props.theme.colors.canceled};
    color: ${props => darken(0.4, props.theme.colors.canceled)};

    &::before {
      background: ${props => darken(0.4, props.theme.colors.canceled)};
    }
  }
`;
