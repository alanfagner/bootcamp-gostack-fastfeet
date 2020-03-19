import styled from 'styled-components';
import SearchContainerDefault from '~/components/SearchContainer';

export const SearchContainer = styled(SearchContainerDefault)`
  div {
    display: flex;
    justify-content: space-between;
    align-items: center;

    button {
      margin-left: 0.5rem;
    }
  }
`;

export const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;

  form {
    padding: 2rem 2rem;
    background: white;
    border-radius: 6px;

    display: grid;
    grid-template-columns: auto auto;
    grid-column-gap: 10px;
    grid-row-gap: 15px;
  }
`;
