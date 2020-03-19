import styled from 'styled-components';
import { lighten } from 'polished';

export const Container = styled.div`
  display: flex;
  flex: 1;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;

  top: 0;
  left: 0;
  bottom: 0;
  right: 0;

  background: rgb(0, 0, 0, 0.5);

  & .content {
    position: absolute;
    height: auto;
    display: flex;
    flex: 1;

    flex-direction: column;
    background: white;
    padding: 1rem;

    min-width: 600px;

    span {
      font-weight: bold;
      color: ${props => props.theme.colors.disable};
      margin-top: 0.5rem;
    }

    .divider {
      margin-bottom: 1rem;
      padding-bottom: 1rem;
      border-bottom: 0.5px solid ${props => lighten(0.5, props.theme.colors.text)};
    }

    & img {
      width: 10rem;
      align-self: center;
    }

    & button {
      margin-top: 1rem;
    }
  }
`;
