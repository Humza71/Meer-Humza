import styled from "styled-components/macro";

const FlexBox = styled.div`
  display: flex;
  flex-direction: ${({ direction = "row" }) => direction};
  padding: ${({ padding = "0px" }) => padding};
`;

export default FlexBox;
