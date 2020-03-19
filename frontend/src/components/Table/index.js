import styled from 'styled-components';

export default styled.table`
  line-height: 3rem;
  border-spacing: 0 1em;

  tbody {
    tr {
      background: white;
      color: ${props => props.theme.colors.text};
    }
  }
`;
