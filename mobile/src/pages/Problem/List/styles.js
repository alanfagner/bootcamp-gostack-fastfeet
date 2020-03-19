import styled from 'styled-components/native';

export const Container = styled.View`
  margin: 10px 20px;
`;

export const List = styled.FlatList`
  border-radius: 4px;
  margin-top: 10px;
`;

export const ItemContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  background: white;
  border-radius: 4px;
  padding: 15px;
  margin: 10px 0px;
  elevation: 1;
  flex: 1;
`;
