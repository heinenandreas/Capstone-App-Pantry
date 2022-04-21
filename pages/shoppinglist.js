import useSWR from "swr";
import styled from "styled-components";
import { Decrement, Increment } from "../components/Buttons/Buttons";
import { getSession } from "next-auth/react";
import { StyledCategory } from "../components/Styles/Styles";
import { Header } from "../components/Header/Header";
import {
  AmountBar,
  ElementContainer,
  StyledItem,
  StyledListName,
  StyledListUnit,
} from "../components/Styles/Styles";
import { Loading } from "../components/Loading/Loading";

const fetcher = (resource, init) =>
  fetch(resource, init).then((res) => res.json());

function Shoppinglist() {
  const products = useSWR("/api/products", fetcher);
  const productList = products.data;

  async function handleProductAmount(id, actualAmount) {
    const response = await fetch(`/api/products/${id}`, {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ actualAmount: actualAmount }),
    });
    const updatedProduct = await response.json();
    if (updatedProduct.success) {
      products.mutate();
    }
  }

  function handleClickDecrement(product) {
    if (product.actualAmount > 0) {
      handleProductAmount(product._id, product.actualAmount - 1);
    }
  }

  function handleClickIncrement(product) {
    handleProductAmount(product._id, product.actualAmount + 1);
  }

  return products.data ? (
    <>
      <Header />
      <StyledCategory>
        <ShoppinglistStyled>
          <ListTitle>Shoppinglist</ListTitle>
        </ShoppinglistStyled>
        <MaxAmount>Max</MaxAmount>
        <StyledList>
          {productList
            .filter((product) => product.actualAmount <= product.minAmount)
            .map((product) => (
              <StyledItem key={product._id}>
                <StyledListName>{product.productName}</StyledListName>
                <ElementContainer>
                  <AmountBar>
                    <Decrement
                      decrement={() => handleClickDecrement(product)}
                    />
                    <StyledListAmount>{product.actualAmount}</StyledListAmount>
                    <Increment
                      increment={() => handleClickIncrement(product)}
                    />
                  </AmountBar>
                  <StyledListUnit>{product.unit}</StyledListUnit>
                  <StyledListAmount>{product.maxAmount}</StyledListAmount>
                </ElementContainer>
              </StyledItem>
            ))}
        </StyledList>
      </StyledCategory>
    </>
  ) : (
    <Loading />
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  // this page is not available for unauthenticated users
  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
}

const MaxAmount = styled.div`
  text-align: right;
  padding-right: 1.5rem;
  width: 95vw;
  border: 2px solid var(--darkblue);
  border-bottom: none;
  border-top: 0px;
  border-left: 0px;
  background-color: #ffebd9;
`;

const StyledListAmount = styled.p`
  color: var(--darkblue);
  font-size: 30px;
`;

const ListTitle = styled.h3`
  font-size: 1.5rem;
  margin: 0;
  padding-left: 0.5rem;
  color: var(--darkblue);
`;

const ShoppinglistStyled = styled.div`
  height: 3rem;
  width: 95vw;
  background-color: var(--lightgreen);
  border-radius: 0 1em 0 0;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: 0.5s;
  border-bottom: 3px solid var(--green);
`;

const StyledList = styled.div`
  width: 95vw;
  border: 2px solid var(--darkblue);
  border-top: 0px;
  border-left: 0px;
  border-radius: 0 0 22px 0;
  background-color: #ffebd9;
`;

export default Shoppinglist;
