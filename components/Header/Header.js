import Logo from "../Logo/Logo";
import { useSession } from "next-auth/react";
import styled from "styled-components";

export function Header() {
  const { data: session } = useSession();

  if (session) {
    return (
      <HeaderContainer>
        <Logo />
      </HeaderContainer>
    );
  }
  return <Logo />;
}

const HeaderContainer = styled.div`
  width: 100vw;
  display: flex;
  height: 6.5rem;
  align-items: center;
  justify-content: center;
  box-shadow: 0 5px 5px 0px rgba(0, 0, 0, 0.3) inset;
  color: #fff;
  text-shadow: 2px 2px 2px #474747;
`;
