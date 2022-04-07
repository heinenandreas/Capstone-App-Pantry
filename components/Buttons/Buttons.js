import styled from "styled-components";
import AddBig from "../../src/Icons/AddBig.svg";
import Remove from "../../src/Icons/Remove.svg";
import Add from "../../src/Icons/Add.svg";
import ArrowLeft from "../../src/Icons/ArrowLeft.svg";
import Trashcan from "../../src/Icons/Trashcan.svg";
import Home from "../../src/Icons/Home.svg";
import ShoppingCart from "../../src/Icons/ShoppingCart.svg";
import Link from "next/link";

export function ButtonAddCategory() {
  return (
    <Link href="/add-edit-card" passHref>
      <RoundButtonBig>
        <AddBig />
      </RoundButtonBig>
    </Link>
  );
}

export function ButtonHome() {
  return (
    <Link href="/">
      <RoundButtonBig>
        <Home />
      </RoundButtonBig>
    </Link>
  );
}

export function ButtonShoppinglist() {
  return (
    <Link href="/shoppinglist" passHref>
      <RoundButtonBig>
        <ShoppingCart />
      </RoundButtonBig>
    </Link>
  );
}

export function ButtonBack() {
  return (
    <RoundButton>
      <ArrowLeft />
    </RoundButton>
  );
}

export function ButtonDelete() {
  return (
    <RoundButton>
      <Trashcan />
    </RoundButton>
  );
}

export function ButtonSave() {
  return (
    <SaveButtonStyled>
      <SaveButtonText>Speichern</SaveButtonText>
    </SaveButtonStyled>
  );
}

export function Decrement() {
  return (
    <DecrementButton>
      <Remove />
    </DecrementButton>
  );
}

export function Increment() {
  return (
    <IncrementButton>
      <Add />
    </IncrementButton>
  );
}

const RoundButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  bottom: 3rem;
  right: 3rem;
  background-color: white;
  width: 4rem;
  height: 4rem;
  border-radius: 999px;
  box-shadow: 0 5px 5px 0px rgba(0, 0, 0, 0.3) inset;
  cursor: pointer;
  transition: 0.6s;

  &:hover {
    transform: scale(1.2);
    background-color: var(--lightorange);
  }
`;

const RoundButtonBig = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  top: 2.5rem;
  right: 5vw;
  background-color: white;
  width: 4rem;
  height: 4rem;
  border-radius: 999px;
  box-shadow: 0 5px 5px 0px rgba(0, 0, 0, 0.3) inset;
  z-index: 2;
  cursor: pointer;
  transition: 0.6s;

  &:hover {
    transform: scale(1.15);
    background-color: var(--lightorange);
    box-shadow: 0 5px 5px 0px rgba(0, 0, 0, 0.3) inset;
  }
`;

const SaveButtonStyled = styled.button`
  width: 8rem;
  height: 3rem;
  border-radius: 1rem;
  border: 0;
  cursor: pointer;
  background-color: white;
  box-shadow: 0 5px 5px 0px rgba(0, 0, 0, 0.3) inset;
  transition: 0.6s;

  &:hover {
    transform: scale(1.15);
    background-color: var(--lightgreen);
    box-shadow: 0 5px 5px 0px rgba(0, 0, 0, 0.3) inset;
  }
`;

const SaveButtonText = styled.p`
  font-size: 1.2rem;
  font-weight: 500;
  color: var(--darkblue);
`;

const IncrementButton = styled.button`
  color: white;
  background-color: var(--lightgreen);
  border: 2px solid var(--green);
  border-radius: 999px;
  height: 30px;
  width: 30px;
  transition: 0.2s;
  font-size: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  margin: 0 1rem;

  &:hover {
    font-size: 20px;
    transform: scale(1.1) rotate(90deg);
    background-color: var(--green);
    border: 2px solid var(--lightgreen);
  }
`;

const DecrementButton = styled.button`
  color: white;
  background-color: var(--neonpink);
  border: 2px solid var(--pink);
  border-radius: 999px;
  height: 30px;
  width: 30px;
  transition: 0.2s;
  font-size: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  margin: 0 1rem;

  &:hover {
    font-size: 20px;
    transform: scale(1.1) rotate(180deg);
    background-color: var(--pink);
    border: 2px solid var(--neonpink);
  }
`;
