import styled from 'styled-components';
import { lighten } from 'polished';
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

  div.upload-container {
    align-items: center;
    display: flex;
    flex-direction: column;
    align-self: center;
    font-weight: bolder;
    color: ${props => lighten(0.4, props.theme.colors.text)};
  }

  div.preview-file {
    display: flex;
    flex-direction: column;
    align-items: center;
    img {
      border-radius: 100%;
      margin-bottom: 0.5rem;
    }
  }

  div.upload-file {
    align-items: center;
    display: flex;
    flex-direction: column;
    align-self: center;
    padding: 4rem;
    border: 0.05rem solid ${props => lighten(0.4, props.theme.colors.text)};
    border-radius: 100%;
    border-style: dashed;
  }

  form {
    padding: 2rem 2rem;
    background: white;
    border-radius: 6px;

    display: flex;
    flex-direction: column;
  }
`;
