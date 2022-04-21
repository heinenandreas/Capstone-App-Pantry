import { signIn } from "next-auth/react";
import styled from "styled-components";
import Image from "next/image";
import { Header } from "../Header/Header";

const LoginImage = () => {
  return <Image priority src="/food.gif" alt="" width={300} height={300} />;
};

export function Login() {
  return (
    <>
      <Header />
      <Loginsite>
        <Textfield>
          <LandingText>
            keep your supplies
            <br />
            up to date
          </LandingText>
        </Textfield>
        <GifContainer>
          <LoginImage />
        </GifContainer>
        <LoginButton onClick={() => signIn()}>
          <LoginText>Login</LoginText>
        </LoginButton>
      </Loginsite>
    </>
  );
}
const Textfield = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const LandingText = styled.p`
  margin-top: 2.5rem;
  line-height: 3.5rem;
  font-size: 2rem;
  color: var(--darkblue);
  transform: rotate(-7deg);
`;

const Loginsite = styled.div`
  position: relative;
  width: 100%;
  flex-direction: column;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const GifContainer = styled.div`
  display: flex;
  justify-content: center;
  height: 21rem;
  bottom: 0;
`;

const LoginButton = styled.button`
  cursor: pointer;
  position: absolute;
  z-index: 2;
  top: 82.4%;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 12rem;
  height: 4.5rem;
  border-radius: 999px;
  background-color: white;
  box-shadow: 0 5px 5px 0px rgba(0, 0, 0, 0.3) inset;
  border: none;
  transition: 0.6s;

  &:hover {
    transform: scale(1.1);
    background-color: var(--lightgreen);
    box-shadow: 0 5px 5px 0px rgba(0, 0, 0, 0.3) inset;
  }
`;

const LoginText = styled.p`
  font-size: 2rem;
  color: var(--darkblue);
  padding: 0;
  margin: 0;
`;
