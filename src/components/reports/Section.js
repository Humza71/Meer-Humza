import styled from "styled-components/macro";

const Section = styled.div`
  display: flex;
  width: ${(props) => props.size.width};
  align-items: center;
  font-size: 13px;
  margin-left: 10px;
`;

export default Section;
