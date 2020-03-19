import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;

  h1 {
    margin-bottom: 2rem;
  }

  .avatar {
    display: flex;
    img {
      border-radius: 100%;
      width: 2.5rem;
      height: 2.5rem;
    }
  }
`;
