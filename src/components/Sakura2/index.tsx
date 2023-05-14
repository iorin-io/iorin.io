import styled from "styled-components";

export const StyledImg = styled.img`
  width: 100%;
`;

function TopPhoto() {
  return <StyledImg src="/photo/sakura2.jpg" alt="sample" />;
}

export default TopPhoto;
