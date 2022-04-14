import styled from "styled-components";
import useSWR from "swr";
import { categories } from "../../itemlist";
import Collapsible from "react-collapsible";
import Image from "next/image";
import { ProductList } from "../ProductList/ProductList";
import { StyledCategory } from "../../components/Styles/Styles";

const LoadingGif = () => {
  return <Image priority src="/loading.gif" alt="" width={300} height={300} />;
};

const fetcher = (resource, init) =>
  fetch(resource, init).then((res) => res.json());

function Category() {
  const products = useSWR("/api/products", fetcher);

  return products.data ? (
    <StyledCategory>
      {categories.map((category) => {
        return (
          <Collapsible trigger={category.name} key={category.id}>
            <ProductList category={category} name={category.name} />
          </Collapsible>
        );
      })}
    </StyledCategory>
  ) : (
    <LoadingContainer>
      <LoadingGif />
      <div>loading</div>
    </LoadingContainer>
  );
}

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default Category;
