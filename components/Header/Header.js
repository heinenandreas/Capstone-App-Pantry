import Logo from "../Logo/Logo";
import { useSession, signIn, signOut } from "next-auth/react";
import styled from "styled-components";

export function Header() {
  const { data: session } = useSession();

  if (session) {
    return (
      <HeaderContainer>
        <Logo />
        <ProfileStyled src={session.user.image} alt="" />
      </HeaderContainer>
    );
  }
  return <Logo />;
}

const ProfileStyled = styled.img`
  margin: 0.5rem;
  width: 4rem;
  height: 4rem;
  border-radius: 999px;
  box-shadow: 0 5px 5px 0px rgba(0, 0, 0, 0.3);
`;

const HeaderContainer = styled.div`
  width: 100vw;
  display: flex;
  height: 8rem;
  align-items: center;
  justify-content: center;
  box-shadow: 0 5px 5px 0px rgba(0, 0, 0, 0.3) inset;
  color: #ffffff;
  text-shadow: 2px 2px 2px #474747;
  border-radius: 0 0 50px 0;
`;
