import { useSession } from "next-auth/react";
import styled from "styled-components";
import { ButtonHome } from "../Buttons/Buttons";
import {
  ButtonAddCategory,
  SignOutButton,
  ButtonShoppinglist,
} from "../Buttons/Buttons";
import { signOut } from "next-auth/react";

function Navbar() {
  const { data: session } = useSession();
  if (session) {
    return (
      <NavbarStyled>
        <ButtonContainerStyled>
          <ButtonHome />
          <ButtonAddCategory />
          <ButtonShoppinglist />
          <SignOutButton />
        </ButtonContainerStyled>
      </NavbarStyled>
    );
  }

  return <div></div>;
}

export default Navbar;

const NavbarStyled = styled.div`
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
  min-width: 20.5rem;
  height: 5.5rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
