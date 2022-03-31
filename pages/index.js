//import Head from "next/head";
//import Image from "next/image";
import Logo from "../components/Logo/Logo";
import styled from "styled-components";
import Category from "../components/Category/Category";
import { ButtonAddCategory } from "../components/Buttons/Buttons";

export default function Home() {
  return (
    <>
      <ButtonAddCategory />
      <Category />
    </>
  );
}
