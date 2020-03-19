import styled from 'styled-components';

export const Container = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;

  top: 0;
  left: 0;
  bottom: 0;
  right: 0;

  background: rgb(0, 0, 0, 0.5);

  content {
    max-width: 600px;
    position: absolute;
    height: auto;
    display: flex;

    flex-direction: column;
    background: white;
    padding: 1rem;

    min-width: 600px;

    span {
      font-weight: bold;
      color: ${props => props.theme.colors.disable};
      margin-top: 0.5rem;
    }
  }
`;
