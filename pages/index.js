//import Head from "next/head";
//import Image from "next/image";
import Logo from "../components/Logo/Logo";
import styled from "styled-components";
import ItemList from "../components/Itemlist/Itemlist";
import Category from "../components/Category/Category";
import { ButtonAddCategory } from "../components/NavButtons/NavButtons";

export default function Home() {
  return (
    <DeviceContainer>
      <Logo />
      <Category />
      <ButtonAddCategory />
    </DeviceContainer>
  );
}

/* Device-Container, remove later */
const DeviceContainer = styled.div`
  position: relative;
  width: 375px;
  height: 812px;
  border: 2px solid black;
  border-radius: 15px;
`;
