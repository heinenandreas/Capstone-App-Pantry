//import Head from "next/head";
//import Image from "next/image";
import styled from "styled-components";
import ItemList from "../components/Itemlist/Itemlist";

export default function Home() {
  return (
    <DeviceContainer>
      <ItemList />
    </DeviceContainer>
  );
}

/* Device-Container, remove later */
const DeviceContainer = styled.div`
  width: 375px;
  height: 812px;
  border: 2px solid black;
  border-radius: 15px;
`;
