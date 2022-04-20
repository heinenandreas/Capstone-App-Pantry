import { useSession } from "next-auth/react";
import { Login } from "../components/Login/Login";
import styled from "styled-components";
import useSWR from "swr";
import { categories } from "../itemlist";
import Collapsible from "react-collapsible";
import Image from "next/image";
import { ProductList } from "../components/ProductList/ProductList";
import { StyledCategory } from "../components/Styles/Styles";
import { Loading } from "../components/Loading/Loading";
import { Header } from "../components/Header/Header";

const fetcher = (resource, init) =>
  fetch(resource, init).then((res) => res.json());

export default function Home() {
  const products = useSWR("/api/products", fetcher);
  const { data: session } = useSession();
  if (session) {
    return products.data ? (
      <>
        <Header />
        <StyledCategory>
          {categories.map((category) => {
            return (
              <Collapsible trigger={category.name} key={category.id}>
                <ProductList category={category} name={category.name} />
              </Collapsible>
            );
          })}
        </StyledCategory>
      </>
    ) : (
      <Loading />
    );
  }
  return <Login />;
}
