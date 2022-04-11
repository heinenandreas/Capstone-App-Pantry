import { signIn } from "next-auth/react";
import styled from "styled-components";

export function Login() {
  return (
    <LoginContainer>
      <LoginButton onClick={() => signIn()}>
        <LoginText>Login</LoginText>
      </LoginButton>
    </LoginContainer>
  );
}

const LoginButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 7rem;
  height: 7rem;
  border-radius: 999px;
  background-color: var(--lightgreen);
  box-shadow: 0 5px 5px 0px rgba(0, 0, 0, 0.3) inset;
  border: none;
  transition: 0.6s;

  &:hover {
    transform: scale(1.2);
    background-color: var(--green);
    box-shadow: 0 5px 5px 0px rgba(0, 0, 0, 0.3) inset;
  }
`;

const LoginContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const LoginText = styled.p`
  font-size: 2rem;
  color: white;
  padding: 0;
  margin: 0;
`;
