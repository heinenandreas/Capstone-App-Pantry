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
  height: 8rem;
  display: flex;
  justify-content: flex-start;
  justify-content: center;
  align-items: center;
  font-size: 4rem;
  color: #ffffff;
  text-shadow: 2px 2px 2px #474747;
  border-radius: 0 0 50px 0;
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
