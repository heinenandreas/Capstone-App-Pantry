import styled from "styled-components";
import Link from "next/link";
import { ButtonHome } from "../Buttons/Buttons";
import { ButtonAddCategory } from "../Buttons/Buttons";
import { ButtonShoppinglist } from "../Buttons/Buttons";

function Navbar() {
  return (
    <NavbarStyled>
      <ButtonContainerStyled>
        <ButtonHome />
        <ButtonAddCategory />
        <ButtonShoppinglist />
      </ButtonContainerStyled>
    </NavbarStyled>
  );
}

export default Navbar;

const NavbarStyled = styled.div`
  z-index: 2;
  display: flex;
  justify-content: center;
  position: fixed;
  bottom: 0;
  height: 5.5rem;
  width: 100vw;
  background-color: var(--orange);
  margin-top: 2rem;
`;

const ButtonContainerStyled = styled.div`
  width: 16rem;
  height: 5.5rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
