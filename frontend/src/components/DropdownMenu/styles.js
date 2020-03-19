import styled from 'styled-components';
import { lighten } from 'polished';
import { FaEllipsisH } from 'react-icons/fa';
import { MdModeEdit, MdRemoveRedEye, MdDeleteForever } from 'react-icons/md';

export const MdModeEditIcon = styled(MdModeEdit).attrs(props => ({
  color: props.theme.colors.icon.edit,
}))``;

export const MdRemoveRedEyeIcon = styled(MdRemoveRedEye).attrs(props => ({
  color: props.theme.colors.icon.visualize,
}))``;

export const MdDeleteForeverIcon = styled(MdDeleteForever).attrs(props => ({
  color: props.theme.colors.icon.delete,
}))``;

export const FaEllipsisHIcon = styled(FaEllipsisH).attrs(props => ({
  color: props.theme.colors.disable,
}))``;

export const Triangle = styled.div`
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  position: absolute;
  border-bottom: 5px solid black;
`;

export const TriangleWhite = styled.div`
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  position: absolute;
  border-bottom: 5px solid white;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  button {
    background: transparent;
    align-self: center;
  }

  & .option-container {
    display: flex;
    justify-content: center;

    & .triangule {
      display: flex;
      justify-content: center;
    }
  }

  ul {
    margin-top: 0.25rem;
    position: absolute;
    background: white;
    border: 0.5px solid ${props => lighten(0.5, props.theme.colors.text)};
    li {
      list-style: none;
      text-align: start;

      padding: 0 0.5rem;
      cursor: pointer;

      &:hover {
        background: ${props => lighten(0.5, props.theme.colors.text)};
      }

      & + li {
        border-top: 0.5px solid ${props => lighten(0.5, props.theme.colors.text)};
      }

      svg {
        margin-right: 0.5rem;
      }
    }
  }
`;
