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

const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const LogoOrange = styled.h2`
  font-family: "Kalam", cursive;
  font-size: 2.5rem;
  margin: 1.5rem 0;
  color: var(--orange);
`;

const LogoPink = styled.h2`
  font-family: "Kalam", cursive;
  font-size: 2.5rem;
  margin: 1.5rem 0;
  color: var(--pink);
`;
const LogoGreen = styled.h2`
  font-family: "Kalam", cursive;
  font-size: 2.5rem;
  margin: 1.5rem 0;
  color: var(--lightgreen);
`;
