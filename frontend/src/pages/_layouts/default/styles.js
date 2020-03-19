import styled from 'styled-components';

export const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  min-width: 600px;

  content {
    background: ${props => props.theme.colors.content};
    padding: 1rem 23rem 0rem 23rem;
    border-width: 10px;
    border-color: #000;
    display: flex;
    flex: 1;
  }
`;
