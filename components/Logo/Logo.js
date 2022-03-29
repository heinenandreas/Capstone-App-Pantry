import styled from "styled-components";

function Logo() {
  return (
    <LogoContainer>
      <LogoOrange>P</LogoOrange>
      <LogoPink>a</LogoPink>
      <LogoGreen>n</LogoGreen>
      <LogoOrange>t</LogoOrange>
      <LogoGreen>r</LogoGreen>
      <LogoPink>y</LogoPink>
    </LogoContainer>
  );
}

export default Logo;

const LogoContainer = styled.h2`
  display: flex;
  justify-content: center;
  font-size: 2.5rem;
  margin: 1.5rem 0;
`;

const LogoOrange = styled.span`
  font-family: "Kalam", cursive;
  color: var(--orange);
`;

const LogoPink = styled.span`
  font-family: "Kalam", cursive;
  color: var(--pink);
`;

const LogoGreen = styled.span`
  font-family: "Kalam", cursive;
  color: var(--lightgreen);
`;
