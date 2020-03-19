import styled from 'styled-components/native';

export const Container = styled.View`
  border: 0.5px solid ${({ theme }) => theme.colors.text};
  border-radius: 6px;
`;

export const TitleContainer = styled.View`
  padding: 15px 10px;
`;

export const Footer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
  background: ${({ theme }) => theme.colors.backgroundLight};
  padding: 15px 10px;
  border-radius: 6px;
`;
export const ShowDetails = styled.TouchableOpacity``;

export const DescribeContainer = styled.View``;
